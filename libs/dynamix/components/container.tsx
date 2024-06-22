import * as dymx from "@/libs/dynamix/dynamix.component";
import React from 'react';

export interface ContainerElement extends dymx.UniversalElement {
	type: 'container';
	config?: {
		justify?:"flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"|"start"|"end"|"left"|"right";
		align?:"stretch"|"flex-start"|"flex-end"|"center"|"baseline"|"start"|"end"|"self-start"|"self-end";
		direction?: 'horizontal'|'vertical'|'horizontal-reverse'|'vertical-reverse';
		gap?: string;
	};
	children?: {default:dymx.Branch[]};
}

export const renderContainerElement = (element: ContainerElement, tool:dymx.ToolType) => (
	<div id={element.id} key={element.id} className={element.className} style={{height:'-webkit-fill-available',width:'-webkit-fill-available',display:'flex', flexDirection:element.config?.direction?.replace('vertical','column')?.replace('horizontal','row')??'column' as any, alignItems:element.config?.align, justifyContent:element.config?.justify, ...element.style}}>
		{element.children?.default.map((el,i,a)=>
		<React.Fragment key={element.id+'c'+i}>
			{(tool.getElement(el as string).type != 'modal' && i!=0 && i!=a.length)?<div key={element.id+'-'+i} style={{width:element.config?.gap, height:element.config?.gap}}></div>:<React.Fragment key={element.id+'t'+i}></React.Fragment>}
			{tool.render(el as string)}
		</React.Fragment>)}
	</div>
);