import * as dymx from "@/libs/dynamix/dynamix.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as font from '@fortawesome/free-solid-svg-icons'

export interface IconElement extends dymx.UniversalElement {
	type: 'icon';
	content:{default:string}
}

export const renderIconElement = (element: IconElement, tool: dymx.ToolType) => (
	<FontAwesomeIcon key={element.id} {...{...element.config, ...(element.functions as any), style: element.style, className: element.className}} icon={(font as any)?.[element.content.default]??<></>} />
);