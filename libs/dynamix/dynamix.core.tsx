import * as dymx from '@/libs/dynamix/dynamix.component';
import { ModalElement } from './components/modal';
import { Encryption } from '@/libs/dynamix/dynamix.security';

export default class DynamixCore {
	metaData: { [branch: string]: dymx.AllElement } = {};
	rerender:()=>void = ()=>{};
	extensions:{[extension:string]:(self:DynamixCore, element: dymx.AllElement, config: any, args?: any)=>any} = {};
	protocol: Encryption;
	constructor(rerender:()=>void) {
		this.protocol = new Encryption();
		this.rerender = rerender;
		this.metaData['root'] = {
			id: 'root',
			type: 'container',
			children: {
				default: [],
			},
		};

		// Future implemented extension
		this.addExtension('validator',(self, element, config:(value:string)=>boolean, args)=>{
			if(typeof document != 'undefined' && element.id != undefined){
				let value = (document.getElementById(element.id) as any)?.value;
				self.editElement(element.id, (prev:any)=>{
					if(!prev.config)prev.config={};
					prev.config.isInvalid = !config(value);
					prev.config.color = prev.config?.isInvalid ? "danger" : "success";
					return prev;
				});
			};
		});
	};

	addExtension(name:string, func:(self:DynamixCore, element: dymx.AllElement, config: any, args?: any)=>any){
		this.extensions[name] = func;
	};

	runExtension(id:string, name:string, args?:any){
		if(!(this.metaData[id]?.extensions as any)?.[name]) throw new Error(`Extension ${name} not defined on ${id}`);
		if(!this.extensions[name]) throw new Error(`Extension ${name} not defined`);
		this.extensions[name](this, this.metaData[id], (this.metaData[id]?.extensions as any)?.[name], args);
	}

	fetchRerender(rerender:()=>void) {
		this.rerender = rerender;
	};

	getDOM(at: string):HTMLElement{
		if(typeof document != 'undefined') return document.getElementById(at) as HTMLElement;
		else throw new Error('Document is not defined yet! (Maybe the page is not loaded)');
	}

	clearMetaData(){this.metaData['root'] = { id: 'root', type: 'container', children: { default: [], }, };}

	getElement(at:string){
		return this.metaData[at];
	};

	editElement(at:string, data:(prev:dymx.AllElement)=>{[key:string]:any}){
		this.metaData[at] = {...this.metaData[at], ...data(this.metaData[at])};
		this.rerender();
	};

	appendElement(at:string, child:string, data: dymx.AllElement): any {
		if(!this.metaData[at]?.type) return;
		if(!this.metaData[at]?.children) this.metaData[at].children = {};
		if(!(this.metaData[at]?.children as any)?.[child]) (this.metaData[at].children as any)[child] = []; // It's normal but the typescript mark it as error;
		data.id = data?.id ?? `${at}${child}${(this.metaData[at].children as any)[child].length}`;
		(this.metaData[at].children as any)[child].push(data.id);
		const children = Object.entries(data.children??{} as dymx.AllElement);
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

	addModal(data: ModalElement) {
		this.appendElement('root','default', data);
	}

	toggleModal(id: string) {
		this.editElement(id, (prev)=>({...prev, config:{...prev.config, isOpen: !(prev.config as any)?.isOpen??false}}));
		this.rerender();
	}

	
}