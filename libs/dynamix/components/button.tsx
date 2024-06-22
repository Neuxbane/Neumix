import * as dymx from "@/libs/dynamix/dynamix.component";
import { Button } from "@nextui-org/button";
import React from 'react';

export interface ButtonElement extends dymx.UniversalElement {
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
		spinner?:dymx.Branch[],
		endContent?:dymx.Branch[],
		startContent?:dymx.Branch[],
		content?:dymx.Branch[],
	},
	functions?:{
		onClick?:dymx.onClickEvent;
		onDoubleClick?:dymx.onDoubleClickEvent;
	}
}

export const renderButtonElement = (element: ButtonElement, tool:dymx.ToolType) => (
	<Button id={element.id} key={element.id} {...{...element.config, ...element.functions, style:element.style, className: element.className,
		endContent:tool.mapping(element.children?.endContent, element.id+'end'),
		startContent:tool.mapping(element.children?.startContent, element.id+'start'),
		spinner:tool.mapping(element.children?.spinner, element.id+'spinner'),
		}}>{tool.mapping(element.children?.content, element.id+'content')}</Button>
);