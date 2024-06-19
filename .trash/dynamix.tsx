import React, { useState } from 'react';
import  {
	Avatar, Button, Checkbox, Input, Modal, Radio, Slider, Switch, Textarea, Select, Card, useModal, Spacer, Table, Calendar, DatePicker, Image, SelectItem, TableBody, TableHeader, TableRow, CardHeader, CardBody, CardFooter, ModalHeader, ModalBody, ModalFooter, TableColumn, TableCell, Tab, Tabs, ModalContent
} from '@nextui-org/react';

import { Time } from "@internationalized/date";

// Define the interfaces
interface avatarElement {
	type: 'avatar',
	style?: React.CSSProperties,
	content: string,
	action?: Function, // onClick
}

interface timeInputElement {
	type: "time-input",
	style?: React.CSSProperties,
	placeholder?: string,
	value?: Time,
	action?: Function, // onChange
}

interface dateInputElement {
	type: 'date-input',
	style?: React.CSSProperties,
	placeholder?: string,
	action?: Function, // onChange
	value?: string,
	minDate?: string,
	maxDate?: string,
}

interface datePickerElement {
	type: 'date-picker',
	style?: React.CSSProperties,
	placeholder?: string,
	action?: Function, // onChange
	value?: string,
	minDate?: string,
	maxDate?: string,
}

interface calendarElement {
	type: 'calendar',
	style?: React.CSSProperties,
	value?: Date,
	action?: Function, // onChange
}

interface calendarRangeElement {
	type: 'calendar-range',
	style?: React.CSSProperties,
	value?: {
		start: Date,
		end: Date
	},
	action?: Function, // onChange
}

interface dateRangePickerElement {
	type: 'date-range-picker',
	style?: React.CSSProperties,
	placeholder?: string,
	action?: Function, // onChange
	value?: {
		start: Date,
		end: Date,
	},
	minDate?: string,
	maxDate?: string,
}

interface checkboxGroupElement {
	type: 'checkbox-group',
	style?: React.CSSProperties,
	content: allElements[]
}

interface inputElement {
	type: 'input',
	style?: React.CSSProperties,
	placeholder?: string,
	inputType?: 'text' | 'password' | 'email' | 'number',
	action?: Function, // onChange
	value?: string,
}

interface chipElement {
	type: 'chip',
	style?: React.CSSProperties,
	content: string,
	startContent?: allElements[],
	color?: string,
	endContent?: allElements[],
	action?: Function, // onClick
}

interface tabsElement {
	type: 'tabs',
	style?: React.CSSProperties,
	content: { name: string, content: allElements[] }[],
}

interface textAreaElement {
	type: 'text-area',
	style?: React.CSSProperties,
	placeholder?: string,
	action?: Function, // onChange
	value?: string,
}

interface modalElement {
	isOpen: boolean,
	style?: React.CSSProperties,
	header: allElements[],
	content: allElements[],
	footer: allElements[],
	action?: Function, // onClose
}

interface radioGroupElement {
	type: 'radio-group',
	style?: React.CSSProperties,
	action?: Function, // onChange
	value?: string,
	options: string[],
}

interface switchElement {
	type: 'switch',
	style?: React.CSSProperties,
	action?: Function, // onChange
	value?: string,
}

interface sliderElement {
	type: 'slider',
	style?: React.CSSProperties,
	action?: Function, // onChange
	value?: string,
}

interface selectElement {
	type: 'select',
	style?: React.CSSProperties,
	placeholder?: string,
	action?: Function, // onChange
	value?: string,
	options: string[],
	selectionMode: 'single'|'multiple',
}

interface imageElement {
	type: 'image',
	style?: React.CSSProperties,
	action?: Function, // onClick
	src: string
}

interface textElement {
	type: 'text',
	style?: React.CSSProperties,
	size?: 'h6'|'h5'|'h4'|'h3'|'h2'|'h1'|'p',
	action?: Function, // onClick
	content: string
}

interface tableElement {
	type: 'table',
	style?: React.CSSProperties,
	content: Record<string, any>[],
	types?: { [header: string]: 'string' | 'integer' | 'float' | 'multiple-select' | 'select' | 'relation' | 'files' | 'email' | 'phone' | 'date' | 'range-date' | 'url' | 'action' };
	usePipeline?: string, // pipeline URL to load using page_number and the length of records in one page
}

interface buttonElement {
	type: 'button',
	style?: React.CSSProperties,
	content: string,
	action?: ()=>any, // onClick
}

interface cardElement {
	type: 'card',
	style?: React.CSSProperties,
	images?: string[],
	title?: string,
	avatar?: string,
	content: allElements[],
	footer?: {
		right:allElements[],
		middle:allElements[],
		left:allElements[]
	},
	action?: Function, // onClick
}

interface containerElement {
	type: 'container',
	style?: React.CSSProperties,
	display?: 'vertical' | 'horizontal',
	content: allElements[],
	action?: Function, // onClick
}

export type allElements = textElement | tableElement | cardElement | containerElement | buttonElement | inputElement | imageElement | selectElement | tabsElement | textAreaElement | switchElement | sliderElement | radioGroupElement | datePickerElement | dateRangePickerElement | calendarElement | calendarRangeElement | timeInputElement | dateInputElement | checkboxGroupElement | avatarElement | chipElement;
export interface modalsType {[modal:string]:modalElement}

export interface dynamixDataType {
	elements: allElements[],
	modals: modalsType,
}


export function openModal(data:dynamixDataType,id:string){
	data.modals[id].isOpen = true;
	return data;
};

export function closeModal(data:dynamixDataType,id:string){
	data.modals[id].isOpen = false;
	return data;
};


const DynamicUI: React.FC<{ data: dynamixDataType  }> = ({ data }) => {
	if(!data.modals)data.modals={};
	// let {} = useState({});
	const renderElement = (element: allElements) => {
		switch (element.type) {
			case 'avatar':
				return <Avatar src={element.content} style={element.style} onClick={element.action as () => void} />;
			case 'button':
				return <Button style={element.style} onClick={element.action as () => void}>{element.content}</Button>;
			case 'card':
				return (
					<Card style={element.style}>
						<CardHeader>
							{element.avatar && <Avatar src={element.avatar} />}
							<h1>{element.title}</h1>
						</CardHeader>
						<CardBody>
							{element.content.map((el, idx) => (
								<>{renderElement(el)}</>
							))}
						</CardBody>
						{element.footer && (
							<CardFooter>
								<div style={{display:'flex'}}>
									{element.footer.left && element.footer.left.map((el, idx) => (
										<>{renderElement(el)}</>
									))}
									{element.footer.middle && element.footer.middle.map((el, idx) => (
										<>{renderElement(el)}</>
									))}
									{element.footer.right && element.footer.right.map((el, idx) => (
										<>{renderElement(el)}</>
									))}
								</div>
							</CardFooter>
						)}
					</Card>
				);
			case 'container':
				return (
					<div style={{...element.style, display: element.display == 'horizontal' ? 'flex' : 'block'}}>
						{element.content.map((el, idx) => (
							<>
								{idx?<div style={{width:'1rem', height:'1rem'}}></div>:<></>}
								<>{renderElement(el)}</>
							</>
						))}
					</div>
				);
			case 'image':
				return <Image src={element.src} style={element.style} onClick={element.action as () => void} />;
			case 'input':
				return (
					<Input
						
						style={element.style}
						placeholder={element.placeholder}
						type={element.inputType}
						onChange={element.action as (e: React.ChangeEvent<HTMLInputElement>) => void}
						value={element.value}
					/>
				);
			case 'select':
				return (
					<Select
						style={element.style}
						placeholder={element.placeholder}
						onChange={element.action as (value: string) => void}
						value={element.value}
						selectionMode={element.selectionMode}
					>
						{element.options.map((option, idx) => (
							<SelectItem key={idx} value={option}>
								{option}
							</SelectItem>
						))}
					</Select>
				);
			case 'slider':
				return <Slider style={element.style} onChange={element.action as (value: number) => void} value={element.value ? parseInt(element.value) : element.value} />;
			case 'switch':
				return <Switch style={element.style} onChange={element.action as (checked: boolean) => void} value={element.value === 'true'} />;
			case 'table':
				return (
					<Table style={element.style}>
						<TableHeader>
							{Object.keys(element.content[0]).map((header, idx) => (
								<TableColumn key={idx}>{header}</TableColumn>
							))}
						</TableHeader>
						<TableBody>
							{element.content.map((row, idx) => (
								<TableRow key={idx}>
									{Object.values(row).map((cell, cellIdx) => (
										<TableCell key={cellIdx}>{cell}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				);
			case 'text':
				return React.createElement(element.size as any, { style:element.style, onClick:element.action as () => void}, element.content);
			case 'text-area':
				return (
					<Textarea
						style={element.style}
						placeholder={element.placeholder}
						onChange={element.action as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
						value={element.value}
					/>
				);
			case 'date-picker':
				return <DatePicker style={element.style} value={element.value} onChange={element.action as (value: Date) => void} />;
			case 'tabs':
				return (<Tabs >
					{element.content.map((tab, idx) => (
						<Tab key={tab.name} title={tab.name}>{tab.content.map((elm, idxt) => renderElement(elm))}</Tab>
					))}
				</Tabs>);
			default:
				return <p>Invalid element: {element.type}</p>;
		}
	};

	return (
		<div>
			{data.elements.map((element, idx) => (
				<>
					{idx?<div style={{width:'1rem', height:'1rem'}}></div>:<></>}
					<>{renderElement(element)}</>
				</>
			))}
			{Object.entries(data.modals).map(([id,element])=> (
									<Modal isOpen={element.isOpen} style={element.style}>
										<ModalContent>
												<ModalHeader>
													{element.header.map((el, idx) => (
														<>{renderElement(el)}</>
													))}
												</ModalHeader>
												<ModalBody>
													{element.content.map((el, idx) => (
														<>{renderElement(el)}</>
													))}
												</ModalBody>
												<ModalFooter>
													{element.footer.map((el, idx) => (
														<>{renderElement(el)}</>
													))}
												</ModalFooter>
										</ModalContent>
									</Modal>
							))}
		</div>
	);
};

export default DynamicUI;
