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

type Branch = string | AllElement;

type onScrollEvent = (event: React.UIEvent<HTMLDivElement>) => void;
type onDropEvent = (event: React.DragEvent<HTMLDivElement>) => void;
type onDragOverEvent = (event: React.DragEvent<HTMLDivElement>) => void;
type onDragStartEvent = (event: React.DragEvent<HTMLDivElement>) => void;
type onDoubleClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => void;
type onKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
type onKeyUpEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
type onKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
type onMouseLeaveEvent = (event: React.MouseEvent<HTMLDivElement>) => void;
type onMouseEnterEvent = (event: React.MouseEvent<HTMLDivElement>) => void;
type onSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => void;
type onFocusEvent = (event: React.FocusEvent<HTMLInputElement>) => void;
type onBlurEvent = (event: React.FocusEvent<HTMLInputElement>) => void;
type onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;
type onClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => void;
type onValueChangeEvent = (value:string) => void;
type onClearEvent = () => void;
type onCloseEvent = () => void;
type onOpenChangeEvent = (isOpen: boolean) => void;

type functionsListener = {
    onScroll?: onScrollEvent;
    onDrop?: onDropEvent;
    onDragOver?: onDragOverEvent;
    onDragStart?: onDragStartEvent;
    onDoubleClick?: onDoubleClickEvent;
    onKeyPress?: onKeyPressEvent;
    onKeyUp?: onKeyUpEvent;
    onKeyDown?: onKeyDownEvent;
    onMouseLeave?: onMouseLeaveEvent;
    onMouseEnter?: onMouseEnterEvent;
    onSubmit?: onSubmitEvent;
    onFocus?: onFocusEvent;
    onBlur?: onBlurEvent;
    onChange?: onChangeEvent;
    onClick?: onClickEvent;
	onValueChange?: onValueChangeEvent;
	onClear?: onClearEvent;
	onClose?: onCloseEvent;
	onOpenChange?: onOpenChangeEvent;
};

interface ToolType {
	render:(id: string) => JSX.Element;
	getElement: (id: string) => AllElement;
}

interface UniversalElement {
	type: string;
	id?: string;
	style?: React.CSSProperties;
	config?: {[key:string]:any};
	className?: string;
	functions?: functionsListener;
	children?: {[key:string]:Branch[]};
	content?: {[key:string]:any};
}

interface InputElement extends UniversalElement {
	type: 'input';
	config?: {
		color?: "default"|"primary"|"secondary"|"success"|"warning"|"danger";
		variant?:"flat"|"bordered"|"underlined"|"faded";
		radius?:"full"|"lg"|"md"|"sm"|"none";
		labelPlacement?:"inside"|"outside"|"outside-left";
		placeholder?:string;
		defaultValue?:string;
		errorMessage?:string;
		description?:string;
		label?:string;
		fullWidth?:boolean;
		isInvalid?:boolean;
		isClearable?:boolean;
		isRequired?:boolean;
		isReadOnly?:boolean;
		isDisabled?:boolean;
		type?:"button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week";
	};
	functions?:{
		onChange?:onChangeEvent;
		onValueChange?:onValueChangeEvent;
		onClear?:onClearEvent;
	}
	children?:{
		endContent?: Branch[];
		startContent?: Branch[];
	};
}

const renderInputElement = (element: InputElement, tool:ToolType) => (
	<Input key={element.id} {...{...element.config, ...element.functions, style: element.style, endContent:<React.Fragment key={element.id+'end'}>{element.children?.endContent?.map((el)=>tool.render(el as string))}</React.Fragment>, startContent:<React.Fragment key={element.id+'start'}>{element.children?.startContent?.map((el)=>tool.render(el as string))}</React.Fragment>, className: element.className}}></Input>
);

interface ContainerElement extends UniversalElement {
	type: 'container';
	config?: {
		justify?:"flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"|"start"|"end"|"left"|"right";
		align?:"stretch"|"flex-start"|"flex-end"|"center"|"baseline"|"start"|"end"|"self-start"|"self-end";
		direction?: 'horizontal'|'vertical'|'horizontal-reverse'|'vertical-reverse';
		gap?: string;
	};
	children?: {default:Branch[]};
}

const renderContainerElement = (element: ContainerElement, tool:ToolType) => (
	<div key={element.id} className={element.className} style={{height:'-webkit-fill-available',width:'-webkit-fill-available',display:'flex', flexDirection:element.config?.direction?.replace('vertical','column')?.replace('horizontal','row')??'column' as any, alignItems:element.config?.align, justifyContent:element.config?.justify, ...element.style}}>{element.children?.default.map((el,i,a)=><React.Fragment key={element.id+'c'+i}>{(tool.getElement(el as string).type != 'modal' && i!=0 && i!=a.length)?<div key={element.id+'-'+i} style={{width:element.config?.gap, height:element.config?.gap}}></div>:<React.Fragment key={element.id+'t'+i}></React.Fragment>}{tool.render(el as string)}</React.Fragment>)}</div>
);

interface ButtonElement extends UniversalElement {
	type: 'button',
	config?: {
		color?: "default"|"primary"|"secondary"|"success"|"warning"|"danger";
		size?:'sm'|'md'|'lg';
		radius?:"full"|"lg"|"md"|"sm"|"none";
		variant?:'solid'|'faded'|'bordered'|'light'|'flat'|'ghost'|'shadow';
		isDisabled?:boolean;
		isLoading?:boolean;
		isIconOnly?:boolean;
	},
	children?:{
		spinner?:Branch[],
		endContent?:Branch[],
		startContent?:Branch[],
		content?:Branch[],
	},
	functions?:{
		onClick?:onClickEvent;
		onDoubleClick?:onDoubleClickEvent;
	}
}

const renderButtonElement = (element: ButtonElement, tool:ToolType) => (
	<Button key={element.id} {...{...element.config, ...element.functions, style:element.style, className: element.className,
		endContent:<React.Fragment key={element.id+'end'}>{element.children?.endContent?.map((el)=>tool.render(el as string))}</React.Fragment>,
		startContent:<React.Fragment key={element.id+'start'}>{element.children?.startContent?.map((el)=>tool.render(el as string))}</React.Fragment>,
		spinner:<React.Fragment key={element.id+'spinner'}>{element.children?.spinner?.map((el)=>tool.render(el as string))}</React.Fragment>,
		}}><React.Fragment>{element.children?.content?.map((el)=>tool.render(el as string))}</React.Fragment></Button>
);

interface TextElement extends UniversalElement {
	type:'text';
	content?:{text?:any};
}

const renderTextElement = (element: TextElement, tool:ToolType) => (
	<p key={element.id} className={element.className} style={element.style}>{element.content?.text}</p>
);

interface ModalElement extends UniversalElement {
	type: 'modal';
	config?:{
		size?:"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"full";
		isOpen?:boolean;
		isDismissable?:boolean;
		placement?:'auto'|'top'|'bottom'|'center'|'top-center'|'bottom-center';
		scrollBehavior?:'inside'|'outside';
	},
	functions?:{
		onClose?:onCloseEvent;
		onOpenChange?:onOpenChangeEvent;
	}
}

const renderModalElement = (element: ModalElement, tool: ToolType) => (
	<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
		<ModalContent>
			<ModalHeader>Modal Title</ModalHeader>
			<ModalBody></ModalBody>
			<ModalFooter></ModalFooter>
		</ModalContent>
	</Modal>
);

type AllElement = InputElement | ContainerElement | ModalElement | ButtonElement | TextElement;

export default class Dynamix {
	metaData: { [branch: string]: AllElement } = {};
	rerender:()=>void = ()=>{};
	constructor(rerender:()=>void) {
		this.rerender = rerender;
		this.metaData['root'] = {
			id: 'root',
			type: 'container',
			children: {
				default: [],
			},
		};
	};

	fetchRerender(rerender:()=>void) {
		this.rerender = rerender;
	};

	getElement(at:string){
		return this.metaData[at];
	};

	editElement(at:string, data:(prev:AllElement)=>{[key:string]:any}){
		this.metaData[at] = {...this.metaData[at], ...data(this.metaData[at])};
		this.rerender();
	};

	appendElement(at:string, child:string, data: AllElement): any {
		if(!this.metaData[at]?.type) return;
		if(!this.metaData[at]?.children) this.metaData[at].children = {};
		if(!(this.metaData[at]?.children as any)?.[child]) (this.metaData[at].children as any)[child] = []; // It's normal but the typescript mark it as error;
		data.id = data?.id ?? `${at}${child}${data.type}${(this.metaData[at].children as any)[child].length}`;
		(this.metaData[at].children as any)[child].push(data.id);
		const children = Object.entries(data.children??{} as AllElement);
		this.metaData[data.id] = {...data, children:{} as any};
		if(children){
			for(const [node_child, node_children] of children){
				for(const node of node_children){
					this.appendElement(data.id, node_child, node);
				}
			};
		};
		this.rerender();
	}

	// addModal(data: ModalElement) {
	// 	data.id = data.id ?? `elm-${Date.now()}-${Math.random()}`;
	// }

	toggleModal(id: string) {
		this.rerender();
	}

	renderElement = (id: string): JSX.Element => {
		const element = this.metaData[id];
		const tool:ToolType = {render:this.renderElement, getElement:(id:string)=>this.metaData[id]};
		if(!element?.type) return <>Err</>;
		switch (element.type) {
			case 'input':
				return renderInputElement(element, tool);
			case 'container':
				return renderContainerElement(element, tool);
			case 'button':
				return renderButtonElement(element, tool);
			case 'text':
				return renderTextElement(element, tool);
			// case 'modal':
			// 	return renderModal(element);
			default:
				return <div key={'error'} style={{ color: 'red' }}>Element with id {id} is not implemented nor exist.</div>;
		}
	};

	compile(): JSX.Element {
		return this.renderElement('root');
	}
}