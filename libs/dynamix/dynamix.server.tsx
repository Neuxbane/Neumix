import DynamixCore from './dynamix.core';
import { Server } from 'socket.io';

export default class Dynamix extends DynamixCore {
	initializeServer(){
		let wss = new Server()
	}

	compile(self:{[declaredName:string]:Dynamix}): string {
		return JSON.stringify({metaData: this.metaData, extensions: this.extensions, declaredName:Object.keys(self)[0]}, function(_, val) {
			if (typeof val === 'function') {
			  return ''+val;
			}
			return val;
		},0);
	}
}