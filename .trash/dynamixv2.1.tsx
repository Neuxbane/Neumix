import React, { useState, useEffect } from 'react';
import { Avatar, AvatarGroup, AvatarIcon,
	Accordion, AccordionItem, Autocomplete,
	AutocompleteSection, AutocompleteItem, Badge,
	Button, ButtonGroup, Breadcrumbs, BreadcrumbItem,
	Card, CardHeader, CardBody, CardFooter,
	CheckboxGroup, Checkbox, Chip, Code, Input,
	DateInput, TimeInput, CircularProgress, Calendar,
	RangeCalendar, DatePicker, DateRangePicker, Divider,
	Dropdown, DropdownTrigger, DropdownMenu,
	DropdownSection, DropdownItem, Image, Kbd,
	Link, Listbox, ListboxSection, ListboxItem, Modal,
	ModalContent, ModalHeader, ModalBody, ModalFooter,
	Navbar, NavbarBrand, NavbarContent, NavbarItem,
	NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
	Pagination, PaginationItem, PaginationCursor, Popover,
	PopoverTrigger, PopoverContent, Progress,
	RadioGroup, Radio, Select, SelectSection,
	SelectItem, Skeleton, Snippet, ScrollShadow,
	Spacer, Spinner, Switch, Slider, Table,
	TableHeader, TableBody, TableColumn, TableRow,
	TableCell, Tabs, Tab, Textarea, Tooltip, User
} from '@nextui-org/react';

type Branch = string;

interface NeumixInterface {
	id?: string;
	style?: React.CSSProperties;
	className?: string;
}

interface Element extends NeumixInterface {
	content?: string | number | Branch[] | any;
	variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
	color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface InputElement extends NeumixInterface {
	onValueChange?: (value: string) => void;
	type:'input';
	inputType: 'text' | 'number' | 'email' | 'password';
	placeholder?: string;
	label?: string;
	validator?: RegExp;
	errorMessage?: string;
	variant?:"flat"|"bordered"|"underlined"|"faded";
	value?: string | number | Date;
}

const renderInput = (element: InputElement)=>(<Input onValueChange={(t)=>element.onValueChange(t)} type={element.inputType} variant={element.variant??'bordered'} label={element.label??'Please fill this field'} placeholder={element.placeholder??element.id} />);

interface CostomElement {
	type: 'costom';
	content: (child:AllElement)=>JSX.Element;
	child: Branch[];
}

interface ContainerElement extends Element {
	type: 'container';
	gap?: string;
	align?:'vertical'|'horizontal';
	content: Branch[] | AllElement[];
}

const renderContainer = (element:ContainerElement, )=>(
	<div key={element.id} style={{...element.style, display: element.align=='horizontal'?'flex':'block'}}>
	{element.content.map((child, id) => {
		return <>
			{id && element.gap && this.metaData[child]?.type!='modal' && this.metaData[child]?.type != undefined ? <div style={{width:element.gap, height:element.gap}}></div> : <></>}
			{this.renderElement(this.metaData[child])}
		</>
	})}
</div>
);

interface TextElement extends NeumixInterface{
	type: 'text';
	size?: 'p'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6';
	content: string | number | Date | Object | null | undefined;
}

const renderText = (element: TextElement)=>(<span key={element.id} style={element.style}>{element.content}</span>);

interface ModalElement extends Element {
	type: 'modal';
	backdrop?:'opaque'|'blur'|'transparent';
	scrollBehavior?:'inside'|'outside';
	placement?:'auto'|'top'|'bottom'|'center'|'top-center'|'bottom-center';
	header: Branch[] | AllElement[];
	body: Branch[] | AllElement[];
	footer: Branch[] | AllElement[];
}

interface ButtonElement extends Element {
	type: 'button';
	isDisabled?: boolean;
	isLoading?: boolean;
	isIconOnly?: boolean;
	endContent?:AllElement;
	startContent?:AllElement;
	size?:'sm'|'md'|'lg';
	radius?:'full'|'lg'|'md'|'sm'|'none';
	onPress?: () => void;
	content: AllElement;
}
type AllElement = ContainerElement | ModalElement | InputElement | TextElement | ButtonElement;

export default class Dynamix {
	metaData: { [branch: string]: AllElement } = {};
	rerender:()=>void = ()=>{};
	constructor(rerender:()=>void) {
		this.rerender = rerender;
		const root: ContainerElement = {
			type: 'container',
			id: 'root',
			content: []
		};
		this.metaData['root'] = root;
	};

	fetchRerender(rerender:()=>void) {
		this.rerender = rerender;
	};

	getElement(at:Branch){
		return this.metaData[at];
	};

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
				data.content.map((v)=>{
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
			case 'input':
				return renderInput(element);
			case 'text':
				return renderText(element);
			case 'container':
				return renderContainer(element);
			// case 'modal':
			// 	return renderModal(element);
			// case 'button':
			// 	return renderButton(element);
			default:
				return <div style={{ color: 'red' }}>Type {element.type} is not implemented nor exist.</div>;
		}
	};

	compile(): JSX.Element {
		return this.renderElement(this.metaData['root']);
	}
}