import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import Image from 'next/image';
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { Banner } from "@/components/banner";
import GradientText from "@/components/gradientText";
import Delay from "@/components/delay";
import DataBase from "@/components/database";

export default function Home() {
  const exampleData = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      height: 5.9,
      hobbies: ["reading", "swimming"],
      favoriteColor: "blue",
      friends: ["Jane", "Paul"],
      documents: ["resume.pdf", "cover_letter.docx"],
      email: "john.doe@example.com",
      phone: "123-456-7890",
      birthday: "1990-01-01",
      vacationPeriod: { start: "2023-06-01", end: "2023-06-10" },
      website: "https://johndoe.com",
      actions: ["Edit", "Delete"],
      image: "https://via.placeholder.com/150",
      city: "New York",
      date: "2023-06-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      height: 5.5,
      hobbies: ["painting", "running"],
      favoriteColor: "red",
      friends: ["John", "Alice"],
      documents: ["portfolio.pdf", "bio.docx"],
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      birthday: "1995-02-15",
      vacationPeriod: { start: "2023-07-05", end: "2023-07-15" },
      website: "https://janesmith.com",
      actions: ["Edit", "Delete"],
      image: "https://via.placeholder.com/150",
      city: "San Francisco",
      date: "2023-06-16",
    },
    {
      id: 3,
      name: "Paul Brown",
      age: 28,
      height: 5.8,
      hobbies: ["gaming", "cooking"],
      favoriteColor: "green",
      friends: ["John", "Jane"],
      documents: ["recipe.pdf", "game_guide.docx"],
      email: "paul.brown@example.com",
      phone: "456-789-0123",
      birthday: "1992-03-10",
      vacationPeriod: { start: "2023-08-01", end: "2023-08-10" },
      website: "https://paulbrown.com",
      actions: ["Edit", "Delete"],
      image: "https://via.placeholder.com/150",
      city: "Los Angeles",
      date: "2023-06-17",
    },
  ];
  
  const exampleTypes = {
    id: "integer",
    name: "string",
    age: "integer",
    height: "float",
    hobbies: "multiple-select",
    favoriteColor: "select",
    friends: "relation",
    documents: "files",
    email: "email",
    phone: "phone",
    birthday: "date",
    vacationPeriod: "range-date",
    website: "url",
    actions: "action",
    image: "string",
    city: "string",
    date: "date",
  };
  
  const exampleViews = [
    {
      name: "Table View",
      type: "table",
      visibleHeaders: ["name", "age", "height", "hobbies", "favoriteColor", "friends", "documents", "email", "phone", "birthday", "vacationPeriod", "website", "actions"],
      sort: [
        { header: "age", order: "ASCD" },
        { header: "name", order: "DESC" },
      ],
    },
    {
      name: "Card View",
      type: "card",
      visibleHeaders: ["name", "age", "hobbies", "favoriteColor", "email", "phone", "website", "actions"],
    },
    {
      name: "Group by City",
      type: "group",
      align: "horizontal",
      group: {
        category: "city",
        type: "card",
        visibleHeaders: ["name", "age", "email"],
      },
    },
    {
      name: "Timeline View",
      type: "timeline",
      dateHeader: "date",
      visibleHeaders: ["name", "date"],
    },
  ];
  
  
  return (
    <div>
      <DataBase data={exampleData} types={exampleTypes} views={exampleViews}></DataBase>
    </div>
  );
}

