import * as dymx from "@/libs/dynamix/dynamix.component";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export interface ModalElement extends dymx.UniversalElement {
	type: 'modal';
	config?:{
		size?:"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"full";
		isOpen?:boolean;
		isDismissable?:boolean;
		placement?:'auto'|'top'|'bottom'|'center'|'top-center'|'bottom-center';
		scrollBehavior?:'inside'|'outside';
		backdrop?:"opaque"|"blur"|"transparent";
		classNames?:{[slot in "wrapper" | "base" | "backdrop" | "header" | "body" | "footer" | "closeButton"]: string;};
	},
	children?:{
		header?:dymx.Branch[],
		body?:dymx.Branch[],
		footer?:dymx.Branch[],
	}
	functions?:{
		onClose?:dymx.onCloseEvent;
		onOpenChange?:dymx.onOpenChangeEvent;
	}
}

export const renderModalElement = (element: ModalElement, tool: dymx.ToolType) => (
	<Modal {...{...element.config, ...element.functions, style: element.style, className: element.className}}>
		<ModalContent>
			<ModalHeader>{tool.mapping(element.children?.header, element.id+'header')}</ModalHeader>
			<ModalBody>{tool.mapping(element.children?.body, element.id+'body')}</ModalBody>
			<ModalFooter>{tool.mapping(element.children?.footer, element.id+'footer')}</ModalFooter>
		</ModalContent>
	</Modal>
);