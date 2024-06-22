import * as dymx from "@/libs/dynamix/dynamix.component";
import { Input } from "@nextui-org/input";

export interface InputElement extends dymx.UniversalElement {
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
		disableAnimation?:boolean;
		isReadOnly?:boolean;
		isDisabled?:boolean;
		type?:"button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week";
	};
	functions?:{
		onChange?:dymx.onChangeEvent;
		onValueChange?:dymx.onValueChangeEvent;
		onClear?:dymx.onClearEvent;
	}
	children?:{
		endContent?:dymx.Branch[];
		startContent?:dymx.Branch[];
	};
}

export const renderInputElement = (element: InputElement, tool:dymx.ToolType) => (
	<Input id={element.id} key={element.id} {...{...element.config, ...element.functions, style: element.style, className: element.className, endContent:tool.mapping(element.children?.endContent, element.id+'end'), startContent:tool.mapping(element.children?.startContent, element.id+'start')}}></Input>
);