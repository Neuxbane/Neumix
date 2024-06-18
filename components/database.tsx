"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Tabs,
  Tab,
  Chip,
} from "@nextui-org/react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  parseISO,
  isWithinInterval,
} from "date-fns";

interface View {
  name?: string;
  type: string;
  visibleHeaders?: string[];
  sort?: Array<{ header: string; order: "ASCD" | "DESC" }>;
  align?: "horizontal" | "vertical";
  group?: View;
  category?: string;
  dateHeader?: string; // New field to specify the date header for timeline view
}

interface DataBaseProps {
  data: Array<Record<string, any>>;
  types: { [header: string]: 'string' | 'integer' | 'float' | 'multiple-select' | 'select' | 'relation' | 'files' | 'email' | 'phone' | 'date' | 'range-date' | 'url' | 'action' };
  views?: View[];
}

const defaultViews: View[] = [
  {
    name: "Default table",
    type: "table",
    visibleHeaders: ["name", "age"],
    sort: [
      { header: "age", order: "ASCD" },
      { header: "name", order: "DESC" },
    ],
  },
  {
    name: "Group by city then age",
    type: "group",
    align: "horizontal",
    group: {
      category: "city",
      type: "group",
      align: "vertical",
      group: {
        category: "age",
        type: "card",
        visibleHeaders: ["name", "image"],
      },
    },
  },
  {
    name: "Weekly timeline",
    type: "timeline",
    dateHeader: "date", // Specify which header to use for date
    visibleHeaders: ["name", "date"],
  },
];

const defaultImage = "https://via.placeholder.com/150";

const DataBase: React.FC<DataBaseProps> = ({ data, views = defaultViews, types }) => {
  const [selectedViewIndex, setSelectedViewIndex] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [headersPerView, setHeadersPerView] = useState(
    views.map((view) => view.visibleHeaders || Object.keys(data[0]))
  );
  const [sortOptions, setSortOptions] = useState(
    views[selectedViewIndex].sort || []
  );

  if (!data.length) {
    return <p>No data available</p>;
  }

  const handleTabChange = (index: number) => {
    setSelectedViewIndex(index);
    setSortOptions(views[index].sort || []);
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => subWeeks(prev, 1));
  };

  const handleHeaderSelectionChange = (keys: Set<string>) => {
    const updatedHeadersPerView = [...headersPerView];
    updatedHeadersPerView[selectedViewIndex] = Array.from(keys);
    setHeadersPerView(updatedHeadersPerView);
  };

  const renderValue = (header: string, value: any) => {
    switch (types[header]) {
      case 'string':
        return <p>{value}</p>;
      case 'integer':
        return <p>{parseInt(value, 10)}</p>;
      case 'float':
        return <p>{value}</p>;
      case 'multiple-select':
        return value.map((v: string, i: number) => <Chip key={i}>{v}</Chip>);
      case 'select':
        return <Chip>{value}</Chip>;
      case 'relation':
        return Array.isArray(value)
          ? value.map((v: string, i: number) => <Chip key={i}>{v}</Chip>)
          : <Chip>{value}</Chip>;
      case 'files':
        return value.map((v: string, i: number) => (
          <Chip key={i} icon={<i className="icon-attachment" />}>{v}</Chip>
        ));
      case 'email':
        return <Chip icon={<i className="icon-email" />}>{value}</Chip>;
      case 'phone':
        return <p>{value}</p>;
      case 'date':
        return <Chip>{format(parseISO(value), "yyyy-MM-dd")}</Chip>;
      case 'range-date':
        return (
          <Chip>{`${format(parseISO(value.start), "yyyy-MM-dd")} to ${format(parseISO(value.end), "yyyy-MM-dd")}`}</Chip>
        );
      case 'url':
        return <Chip>{value}</Chip>; // Assuming value is the URL title
      case 'action':
        return value.map((v: string, i: number) => <Button key={i}>{v}</Button>);
      default:
        return <p>{value}</p>;
    }
  };

  const renderTable = (view: View, data: Record<string, any>[]) => {
    const headers = headersPerView[selectedViewIndex];

    // Sort data
    const sortedData = [...data];
    sortOptions.forEach(({ header, order }) => {
      sortedData.sort((a, b) => {
        if (order === "ASCD") {
          return a[header] > b[header] ? 1 : -1;
        } else {
          return a[header] < b[header] ? 1 : -1;
        }
      });
    });

    return (
      <Table selectionMode="multiple" color="primary">
        <TableHeader>
          {headers.map((header) => (
            <TableColumn key={header}>{header}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {sortedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={header}>{renderValue(header, row[header])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderCardView = (view: View, data: Array<Record<string, any>>) => {
    const headers = headersPerView[selectedViewIndex];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              margin: "10px",
              width: "200px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.image || defaultImage}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <div style={{ padding: "10px" }}>
              {headers.map(
                (header) =>
                  header !== "image" && (
                    <p key={header}>
                      <strong>{header}:</strong> {renderValue(header, item[header])}
                    </p>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupView = (view: View, data: Record<string, any>[]) => {
    const { group, align } = view;
    if (!group) return null;

    const groupCategory = group.category;

    const groupedData = data.reduce((acc, item) => {
      const key = item[groupCategory as string];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: align === "horizontal" ? "row" : "column",
          gap: "20px",
        }}
      >
        {Object.keys(groupedData).map((groupKey) => (
          <div key={groupKey} style={{ margin: "10px" }}>
            <h3>{groupKey}</h3>
            {group.type === "card"
              ? renderCardView(group, groupedData[groupKey])
              : group.group
              ? renderGroupView({ ...group }, groupedData[groupKey])
              : renderTable({ ...group }, groupedData[groupKey])}
          </div>
        ))}
      </div>
    );
  };

  const renderTimelineView = (view: View, data: Record<string, any>[]) => {
    const dateHeader = view.dateHeader;
    if (!dateHeader) return <p>No date header specified for timeline view</p>;

    // Get the current week's start and end dates
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday as start of the week
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });

    // Filter data within the current week
    const weeklyData = data.filter((item) => {
      const date = parseISO(item[dateHeader]);
      return isWithinInterval(date, { start, end });
    });

    // Sort data by date
    weeklyData.sort((a, b) =>
      parseISO(a[dateHeader]) > parseISO(b[dateHeader]) ? 1 : -1
    );

    // Group data by day
    const daysOfWeek = Array.from(
      { length: 7 },
      (_, i) => format(start.getTime() + 1000 * 60 * 60 * 24 * i, "yyyy-MM-dd")
    );
    const dailyData = daysOfWeek.map((day) => {
      return weeklyData.filter(
        (item) => format(parseISO(item[dateHeader]), "yyyy-MM-dd") === day
      );
    });

    return (
      <div>
        <h3>Weekly Timeline</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="nav-button" onClick={handlePreviousWeek}>
            Previous Week
          </button>
          <button className="nav-button" onClick={handleNextWeek}>
            Next Week
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          {daysOfWeek.map((day, index) => (
            <div key={day}>
              <div
                key={day}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  margin: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4>{format(parseISO(day), "EEEE, yyyy-MM-dd")}</h4>
              </div>
              {dailyData[index].map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    margin: "10px",
                    padding: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                >
                  {headersPerView[selectedViewIndex].map(
                    (header) =>
                      header !== dateHeader && (
                        <p key={header}>
                          <strong>{header}:</strong> {renderValue(header, item[header])}
                        </p>
                      )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <Tabs
          onChange={handleTabChange}
          aria-label="View Tabs"
          value={selectedViewIndex}
        >
          {views.map((view, index) => (
            <Tab key={index} title={view.name}>
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button auto>Columns</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={new Set(headersPerView[selectedViewIndex])}
                    selectionMode="multiple"
                    onSelectionChange={handleHeaderSelectionChange}
                  >
                    {Object.keys(data[0]).map((header) => (
                      <DropdownItem key={header}>{header}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                {view.type === "table"
                  ? renderTable(view, data)
                  : view.type === "card"
                  ? renderCardView(view, data)
                  : view.type === "timeline"
                  ? renderTimelineView(view, data)
                  : renderGroupView(view, data)}
              </div>
            </Tab>
          ))}
          <Tab key="addNew" title="+ Add New View"/>
        </Tabs>
      </div>
      <style jsx>{`
        .nav-button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          border-radius: 5px;
        }

        .nav-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default DataBase;
