import React from 'react';

import * as dymx from '@/libs/dynamix/dynamix.component';
import { renderModalElement } from './components/modal';
import { renderInputElement } from './components/input';
import { renderContainerElement } from './components/container';
import { renderButtonElement } from './components/button';
import { renderTextElement } from './components/text';
import { renderIconElement } from './components/icon';
import DynamixCore from './dynamix.core';


export default class Dynamix extends DynamixCore {
	renderElement = (id: string): JSX.Element => {
		const element = this.metaData[id];
		const tool:dymx.ToolType = {render:this.renderElement, getElement:(id:string)=>this.metaData[id], mapping:(branches, id)=><React.Fragment key={id}>{branches?.map((el)=>this.renderElement(el as string))}</React.Fragment>};
		if(!element?.type) throw new Error("Element doesn't have a type");
		switch (element.type) {
			case 'input':
				return renderInputElement(element, tool);
			case 'container':
				return renderContainerElement(element, tool);
			case 'button':
				return renderButtonElement(element, tool);
			case 'text':
				return renderTextElement(element, tool);
			case 'modal':
				return renderModalElement(element, tool);
			case 'icon':
				return renderIconElement(element, tool);
			default:
				return <div key={'error'} style={{ color: 'red' }}>Element with id {id} is not implemented nor exist.</div>;
		}
	};

	compile(): JSX.Element {
		return this.renderElement('root');
	}

	renderFromServer(response:string): void {
		console.log(response)
		// This function handle the response carefully to not execute harmful code (potential hackers) into client.
		const functionRegex = /^(async\s*)?(function\s*\(.*\)|\(.*\)\s*=>|async\s*\(.*\)\s*=>|[^=]*=>|function\s*|\(.*\)\s*=>\s*\(.*\))/;
		const thisClass = this;
		const declaredName = JSON.parse(response).declaredName;
		const parsedObj = JSON.parse(response, function(key, val) {
			if (typeof val === 'string' && functionRegex.test(val.trim())) {
				return new Function(declaredName,`return ${val}`)(thisClass); // Convert string back to function
			}
			return val;
		});
		this.metaData = parsedObj.metaData;
		this.extensions = parsedObj.extensions;
		console.log(parsedObj.metaData);
		this.rerender();
	}
}