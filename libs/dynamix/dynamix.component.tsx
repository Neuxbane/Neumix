import { ButtonElement } from "./components/button";
import { ContainerElement } from "./components/container";
import { IconElement } from "./components/icon";
import { InputElement } from "./components/input";
import { ModalElement } from "./components/modal";
import { TextElement } from "./components/text";

export type AllElement = InputElement | ContainerElement | ModalElement | ButtonElement | TextElement | IconElement;


export type Branch = string | AllElement;

export type onScrollEvent = (event: React.UIEvent<HTMLDivElement>) => void;
export type onDropEvent = (event: React.DragEvent<HTMLDivElement>) => void;
export type onDragOverEvent = (event: React.DragEvent<HTMLDivElement>) => void;
export type onDragStartEvent = (event: React.DragEvent<HTMLDivElement>) => void;
export type onDoubleClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type onKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type onKeyUpEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type onKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => void;
export type onMouseLeaveEvent = (event: React.MouseEvent<HTMLDivElement>) => void;
export type onMouseEnterEvent = (event: React.MouseEvent<HTMLDivElement>) => void;
export type onSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => void;
export type onFocusEvent = (event: React.FocusEvent<HTMLInputElement>) => void;
export type onBlurEvent = (event: React.FocusEvent<HTMLInputElement>) => void;
export type onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type onClickEvent = (event: React.MouseEvent<HTMLButtonElement>) => void;
export type onValueChangeEvent = (value:string) => void;
export type onClearEvent = () => void;
export type onCloseEvent = () => void;
export type onOpenChangeEvent = (isOpen: boolean) => void;

export type functionsListener = {
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

export interface ToolType {
	render:(id: string) => JSX.Element;
	getElement: (id: string) => AllElement;
	mapping:(branches:Branch[] | undefined, id:string) => JSX.Element;
}

export interface UniversalElement {
	type: string;
	id?: string;
	style?: React.CSSProperties;
	config?: {[key:string]:any};
	className?: string;
	functions?: functionsListener;
	children?: {[key:string]:Branch[]};
	content?: {[key:string]:any};
	extensions?:{
		validator?:(value:string)=>boolean;
		[extension:string]:any;
	}; // Future implemented extension like drag element or something
}