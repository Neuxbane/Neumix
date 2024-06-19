import React, { useState, useEffect } from 'react';
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@nextui-org/autocomplete";
import { Badge } from "@nextui-org/badge";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import { Code } from "@nextui-org/code";
import { Input } from "@nextui-org/input";
import { DateInput } from "@nextui-org/date-input";
import { TimeInput } from "@nextui-org/date-input";
import { CircularProgress } from "@nextui-org/progress";
import { Calendar } from "@nextui-org/calendar";
import { RangeCalendar } from "@nextui-org/calendar";
import { DatePicker } from "@nextui-org/date-picker";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Divider } from "@nextui-org/divider";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Progress } from "@nextui-org/progress";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import { Snippet } from "@nextui-org/snippet";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { Switch } from "@nextui-org/switch";
import { Slider } from "@nextui-org/slider";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";

type Branch = string;

interface Element {
	id?: string;
	style?: React.CSSProperties;
	content?: string | number | Branch[] | any;
}

interface InputElement extends Element {
	onChange?: (value: string) => void;
	type:'input';
	inputType: 'text' | 'number' | 'email' | 'password';
	placeholder?: string;
	label?: string;
	variant?:"flat"|"bordered"|"underlined"|"faded";
	value?: string | number | Date;
}

interface AvatarElement extends Element {
	type: 'avatar';
	src: string;
	alt: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	bordered?: boolean;
	color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface AccordionElement extends Element {
	type: 'accordion';
	items: { header: string, content: string }[];
}

interface AutocompleteElement extends Element {
	type: 'autocomplete';
	options: string[];
	placeholder?: string;
	onChange?: (value: string) => void;
}

interface BadgeElement extends Element {
	type: 'badge';
	color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface BreadcrumbsElement extends Element {
	type: 'breadcrumbs';
	items: { text: string, href?: string }[];
}

interface CardElement extends Element {
	type: 'card';
	header?: string;
	body: string;
	footer?: string;
	variant?: 'shadow' | 'flat' | 'bordered';
}

interface CheckboxGroupElement extends Element {
	type: 'checkboxGroup';
	items: { label: string, value: string }[];
	onChange?: (values: string[]) => void;
}

interface ChipElement extends Element {
	type: 'chip';
	color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
	variant?: 'solid' | 'outlined' | 'light';
}

interface CodeElement extends Element {
	type: 'code';
	block?: boolean;
}

interface DateInputElement extends Element {
	type: 'dateInput';
	value?: Date;
	onChange?: (date: Date) => void;
}

interface TimeInputElement extends Element {
	type: 'timeInput';
	value?: Date;
	onChange?: (time: Date) => void;
}

interface CircularProgressElement extends Element {
	type: 'circularProgress';
	value?: number;
}

interface CalendarElement extends Element {
	type: 'calendar';
	value?: Date;
	onChange?: (date: Date) => void;
}

interface RangeCalendarElement extends Element {
    type: 'rangeCalendar';
    value?: [Date, Date];
    onChange?: (range: [Date, Date]) => void;
}

interface DatePickerElement extends Element {
    type: 'datePicker';
    value?: Date;
    onChange?: (date: Date) => void;
}

interface DateRangePickerElement extends Element {
    type: 'dateRangePicker';
    value?: [Date, Date];
    onChange?: (range: [Date, Date]) => void;
}

interface DividerElement extends Element {
    type: 'divider';
}

interface DropdownElement extends Element {
    type: 'dropdown';
    items: { key: string, content: string }[];
}

interface KbdElement extends Element {
    type: 'kbd';
}

interface LinkElement extends Element {
    type: 'link';
    href: string;
}

interface ListboxElement extends Element {
    type: 'listbox';
    items: { key: string, content: string }[];
}

interface NavbarElement extends Element {
    type: 'navbar';
    brand: string;
    items: { key: string, content: string, href?: string }[];
}

interface PaginationElement extends Element {
    type: 'pagination';
    total: number;
    initialPage?: number;
}

interface ProgressElement extends Element {
    type: 'progress';
    value?: number;
}

interface RadioGroupElement extends Element {
    type: 'radioGroup';
    items: { label: string, value: string }[];
    onChange?: (value: string) => void;
}

interface SelectElement extends Element {
    type: 'select';
    items: { key: string, content: string }[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

interface SnippetElement extends Element {
    type: 'snippet';
    text: string;
    code?: boolean;
}

interface SpinnerElement extends Element {
    type: 'spinner';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface SwitchElement extends Element {
    type: 'switch';
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

interface SliderElement extends Element {
    type: 'slider';
    value?: number;
    onChange?: (value: number) => void;
}

interface TableElement extends Element {
    type: 'table';
    columns: string[];
    rows: { [key: string]: string }[];
}

interface TabsElement extends Element {
    type: 'tabs';
    tabs: { key: string, content: string }[];
}

interface TextareaElement extends Element {
    type: 'textarea';
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}

interface TooltipElement extends Element {
    type: 'tooltip';
    content: string;
    trigger: string;
}

interface UserElement extends Element {
    type: 'user';
    src: string;
    name: string;
    email?: string;
}

interface TextElement extends Element {
	type: 'text';
	content: string;
}

interface ContainerElement extends Element {
	type: 'container';
	gap?: string;
	align?:'vertical'|'horizontal';
	content: Branch[];
}

interface ModalElement extends Element {
	type: 'modal';
	content: Branch[];
}

interface ButtonElement extends Element {
	type: 'button';
	onClick: () => void;
	content: string;
}

interface ImageElement extends Element {
    type: 'image';
    src: string;
    alt: string;
}

interface UploadElement extends Element {
	type: 'upload';
	accept?: string;
	multiple: boolean;
	onChange?: (files: FileList) => void;
}

type AllElement = Element | InputElement | AvatarElement | AccordionElement | AutocompleteElement | BadgeElement | BreadcrumbsElement | CardElement | CheckboxGroupElement | ChipElement | CodeElement | DateInputElement | TimeInputElement | CircularProgressElement | CalendarElement | RangeCalendarElement | DatePickerElement | DateRangePickerElement | DividerElement | DropdownElement | KbdElement | LinkElement | ListboxElement | NavbarElement | PaginationElement | ProgressElement | RadioGroupElement | SelectElement | SnippetElement | SpinnerElement | SwitchElement | SliderElement | TableElement | TabsElement | TextareaElement | TooltipElement | UserElement | TextElement | ContainerElement | ModalElement | ButtonElement | ImageElement | UploadElement;

export default class Dynamix {
	metaData: { [branch: string]: AllElement } = {};
	modalVisibility: { [id: string]: boolean } = {};
	rerender:()=>void = ()=>{};
	constructor(rerender:()=>void) {
		this.rerender = rerender;
		const root: ContainerElement = {
			type: 'container',
			id: 'root',
			content: []
		};
		this.metaData['root'] = root;
	}

	fetchRerender(rerender:()=>void){
		this.rerender = rerender;
	}

	getElement(at:Branch){
		return this.metaData[at];
	}

	editElement(at:Branch, data:(prev:AllElement)=>{[key:string]:any}){
		const branch = this.metaData[at];
		if(branch){
			this.metaData[at] = {...branch, ...data(branch)};
		};
		this.rerender();
	};

	appendElement(at: Branch, data: AllElement): any {
		const branch = this.metaData[at];
		if (branch != undefined && (branch.type == 'container' || branch.type == 'modal')) {
			data.id = data.id ?? `elm-${Date.now()}-${Math.round(Math.random()*10000)}`;
			branch.content.push(data.id);
			this.metaData[data.id] = data;
			if(typeof(data.content) == 'object'){
				data.content.map(v=>{
					this.appendElement(data.id, v);
				});
			}
			this.rerender();
			return (child: AllElement) => this.appendElement(at, child);
		} else {
			console.error(`Branch ${at} not found or not a container`);
		}
	}

	addModal(data: ModalElement) {
		data.id = data.id ?? `elm-${Date.now()}-${Math.random()}`;
		(this.metaData['root'].content as any).push(data.id);
		this.metaData[data.id] = data;
		data.content.map(v=>this.appendElement(data.id, v));
		this.modalVisibility[data.id] = false;
		this.rerender();
		return (child: AllElement) => this.appendElement(data.id as string, child);
	}

	toggleModal(id: string) {
		this.modalVisibility[id] = !this.modalVisibility[id];
		console.log(this.modalVisibility[id]);
		this.rerender();
	}

	renderElement = (element: AllElement): JSX.Element => {
		if(!element?.type) return null;
		switch (element.type) {
			case 'avatar':
				return <Avatar key={element.id} src={element.src} alt={element.alt} size={element.size} bordered={element.bordered} color={element.color} />;
			case 'accordion':
				return (
					<Accordion key={element.id}>
						{element.items.map((item, index) => (
							<AccordionItem key={index} title={item.header}>
								{item.content}
							</AccordionItem>
						))}
					</Accordion>
				);
			case 'autocomplete':
				return (
					<Autocomplete key={element.id} placeholder={element.placeholder}>
						{element.options.map((option, index) => (
							<AutocompleteItem key={index} value={option}>
								{option}
							</AutocompleteItem>
						))}
					</Autocomplete>
				);
			case 'badge':
				return <Badge key={element.id} color={element.color}>{element.content}</Badge>;
			case 'breadcrumbs':
				return (
					<Breadcrumbs key={element.id}>
						{element.items.map((item, index) => (
							<BreadcrumbItem key={index} href={item.href}>
								{item.text}
							</BreadcrumbItem>
						))}
					</Breadcrumbs>
				);
			case 'card':
				return (
					<Card key={element.id} variant={element.variant}>
						{element.header && <CardHeader>{element.header}</CardHeader>}
						<CardBody>{element.body}</CardBody>
						{element.footer && <CardFooter>{element.footer}</CardFooter>}
					</Card>
				);
			case 'checkboxGroup':
				return (
					<CheckboxGroup key={element.id} onChange={element.onChange}>
						{element.items.map((item, index) => (
							<Checkbox key={index} value={item.value}>
								{item.label}
							</Checkbox>
						))}
					</CheckboxGroup>
				);
			case 'chip':
				return <Chip key={element.id} color={element.color} variant={element.variant}>{element.content}</Chip>;
			case 'code':
				return <Code key={element.id} block={element.block}>{element.content}</Code>;
			case 'input':
				return <Input type={element.inputType} variant={element.variant??'bordered'} label={element.label??'Please fill this field'} placeholder={element.placeholder??element.id} />
			case 'dateInput':
				return <DateInput key={element.id} value={element.value} onChange={element.onChange} />;
			case 'timeInput':
				return <TimeInput key={element.id} value={element.value} onChange={element.onChange} />;
			case 'circularProgress':
				return <CircularProgress key={element.id} value={element.value} />;
			case 'calendar':
				return <Calendar key={element.id} value={element.value} onChange={element.onChange} />;
			case 'rangeCalendar':
				return <RangeCalendar key={element.id} value={element.value} onChange={element.onChange} />;
			case 'datePicker':
				return <DatePicker key={element.id} value={element.value} onChange={element.onChange} />;
			case 'dateRangePicker':
				return <DateRangePicker key={element.id} value={element.value} onChange={element.onChange} />;
			case 'divider':
				return <Divider key={element.id} />;
			case 'dropdown':
				return (
					<Dropdown key={element.id}>
						<DropdownTrigger>
							<Button>{element.content}</Button>
						</DropdownTrigger>
						<DropdownMenu>
							{element.items.map((item, index) => (
								<DropdownItem key={index}>{item.content}</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				);
			case 'image':
				return <Image key={element.id} src={element.src} alt={element.alt} />;
			case 'kbd':
				return <Kbd key={element.id}>{element.content}</Kbd>;
			case 'link':
				return <Link key={element.id} href={element.href}>{element.content}</Link>;
			case 'listbox':
				return (
					<Listbox key={element.id}>
						{element.items.map((item, index) => (
							<ListboxItem key={index}>{item.content}</ListboxItem>
						))}
					</Listbox>
				);
			case 'navbar':
				return (
					<Navbar key={element.id}>
						<NavbarBrand>{element.brand}</NavbarBrand>
						<NavbarContent>
							{element.items.map((item, index) => (
								<NavbarItem key={index}>
									<Link href={item.href}>{item.content}</Link>
								</NavbarItem>
							))}
						</NavbarContent>
					</Navbar>
				);
			case 'pagination':
				return <Pagination key={element.id} total={element.total} initialPage={element.initialPage} />;
			case 'progress':
				return <Progress key={element.id} value={element.value} />;
			case 'radioGroup':
				return (
					<RadioGroup key={element.id} onChange={element.onChange}>
						{element.items.map((item, index) => (
							<Radio key={index} value={item.value}>
								{item.label}
							</Radio>
						))}
					</RadioGroup>
				);
			case 'select':
				return (
					<Select key={element.id} placeholder={element.placeholder} onChange={element.onChange}>
						{element.items.map((item, index) => (
							<SelectItem key={index} value={item.key}>
								{item.content}
							</SelectItem>
						))}
					</Select>
				);

			case 'snippet':
				return <Snippet key={element.id} text={element.text} code={element.code} />;

			case 'spinner':
				return <Spinner key={element.id} size={element.size} />;
			case 'switch':
				return <Switch key={element.id} checked={element.checked} onChange={element.onChange} />;
			case 'slider':
				return <Slider key={element.id} value={element.value} onChange={element.onChange} />;
			case 'table':
				return (
					<Table key={element.id}>
						<TableHeader>
							{element.columns.map((col, index) => (
								<TableColumn key={index}>{col}</TableColumn>
							))}
						</TableHeader>
						<TableBody>
							{element.rows.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{element.columns.map((col, colIndex) => (
										<TableCell key={colIndex}>{row[col]}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				);
			case 'tabs':
				return (
					<Tabs key={element.id}>
						{element.tabs.map((tab, index) => (
							<Tab key={index} title={tab.key}>
								{tab.content}
							</Tab>
						))}
					</Tabs>
				);
				
			case 'textarea':
				return <Textarea key={element.id} label={element.label} placeholder={element.placeholder} value={element.value} onChange={element.onChange} />;
			case 'tooltip':
				return (
					<Tooltip key={element.id} content={element.content}>
						{element.trigger}
					</Tooltip>
				);
			case 'user':
				return <User key={element.id} src={element.src} name={element.name} email={element.email} />;
			case 'text':
				return <span key={element.id} style={element.style}>{element.content}</span>;
			case 'container':
				return (
					<div key={element.id} style={{...element.style, display: element.align=='horizontal'?'flex':'block'}}>
						{element.content.map((child, id) => {
							return <>
								{id && element.gap && this.metaData[child].type!='modal' ? <div style={{width:element.gap, height:element.gap}}></div> : <></>}
								{this.renderElement(this.metaData[child])}
							</>
						})}
					</div>
				);
			case 'modal':
				console.log("reload", this.modalVisibility[element.id], element.id)
				return (
					<Modal key={element.id} isOpen={this.modalVisibility[element.id]} onClose={() => this.toggleModal(element.id)}>
						<ModalContent>
							<ModalHeader>Modal</ModalHeader>
							<ModalBody>
								{element.content.map((child) => this.renderElement(this.metaData[child]))}
							</ModalBody>
							<ModalFooter>
								<Button onClick={() => this.toggleModal(element.id)}>Close</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				);
			case 'button':
				return (
					<Button key={element.id} style={element.style} onClick={element.onClick}>
						{element.content}
					</Button>
				);
			case 'upload':
				return (
					<Input
					key={element.id}
					type="file"
					accept={element.accept}
					multiple={element.multiple}
					onChange={(e) => {
						if (element.onChange && e.target.files) {
						element.onChange(e.target.files);
						}
					}}
					/>
				);
				  
			default:
				return <div key={element.id} style={{ color: 'red' }}>Error: Unknown element type</div>;
		}
	};

	compile(): JSX.Element {
		return this.renderElement(this.metaData['root']);
	}
}