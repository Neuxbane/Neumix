import * as dymx from "@/libs/dynamix/dynamix.component";

export interface TextElement extends dymx.UniversalElement {
	type:'text';
	content?:{text?:any};
}

export const renderTextElement = (element: TextElement, tool:dymx.ToolType) => (
	<p id={element.id} key={element.id} className={element.className} style={element.style}>{element.content?.text}</p>
);