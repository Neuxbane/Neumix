"use server";
import Dynamix from '@/libs/dynamix/dynamix.server';
const dynamix = new Dynamix(() => {}); // Create an instance of Dynamix

export async function dynamixUIRegister(publicKey:BigInt){
	dynamix.clearMetaData();
	dynamix.appendElement('root', 'default', {
		type:'container',
		style:{padding:'0 20dvw'},
		config: {
			direction:'vertical',
			justify:'center',
			align:'center',
			gap:'1rem',
		},
		children:{
			default:[
				{
					id:'email',
					type:'input',
					config:{
						label:'Email',
						labelPlacement:'outside',
						type:'email',
						variant:'bordered',
						isRequired: true,
						errorMessage: 'Must be a valid email!'
					},
					functions:{
						onValueChange: (value)=>{console.log(value)},
					},
					extensions:{
						validator:(value)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value)
					}
				},
				{
					id:'password',
					type:'input',
					config:{
						label:'Password',
						labelPlacement:'outside',
						type:'password',
						variant:'bordered',
						isRequired: true,
					},
					children:{
						endContent:[{id:'icnpass',type:'icon',style:{cursor:'pointer'},content:{default:'faEye'},functions:{onClick:()=>{
							dynamix.editElement('icnpass', (prev)=>({content:{default:(prev.content as any)?.default=='faEye'?'faEyeSlash':'faEye'}}))
							dynamix.editElement('password', (prev:any)=>{prev.config.type = prev.config.type=='password'?'text':'password';return prev;})
						}}}]
					},
					functions:{
						onValueChange: (value)=>{console.log(value)},
					}
				},
				{
					id:'confirm',
					type:'input',
					config:{
						label:'Confirm password',
						labelPlacement:'outside',
						type:'password',
						variant:'bordered',
						errorMessage: 'Confirm password did not match the password!',
						isRequired: true,
					},
					children:{
						endContent:[{id:'icnconfirm',type:'icon',style:{cursor:'pointer'},content:{default:'faEye'},functions:{onClick:()=>{
							dynamix.editElement('icnconfirm', (prev)=>({content:{default:(prev.content as any)?.default=='faEye'?'faEyeSlash':'faEye'}}))
							dynamix.editElement('confirm', (prev:any)=>{prev.config.type = prev.config.type=='password'?'text':'password';return prev;})
						}}}]
					},
					functions:{
						onValueChange: (value)=>{console.log(value)},
					},
					extensions:{
						validator:(value)=>{
							const passwordVal = (dynamix.getDOM('password')as any).value;
							return value == passwordVal;
						}
					}
				},
				{
					type:'container',
					config:{
						direction:'horizontal',
						justify:'right'
					},
					children:{
						default:[
							{
								type:'button',
								children:{
									content:[{type:'text',content:{text:'Register'}}]
								},
								functions:{
									onClick:()=>{
										dynamix.runExtension('email','validator');
										dynamix.runExtension('confirm','validator');
									}
								}
							},
						]
					}
				}
			]
		}
	});
	const compiledUI = dynamix.compile({dynamix});
	const payload:string[] = compiledUI.split('').reduce((a:any,b:any,i:any)=>{
		i = Math.floor(i/100)
		a[i]=(a[i]??'')+b;
		return a;
	},[]);

	return [Number(dynamix.protocol.publicKey),payload.map(x=>dynamix.protocol.encrypt(x,publicKey))];
}

export async function dynamixUILogin(publicKey:BigInt){
	dynamix.clearMetaData();
	dynamix.appendElement('root', 'default', {
		type:'container',
		style:{padding:'0 20dvw'},
		config: {
			direction:'vertical',
			justify:'center',
			align:'center',
			gap:'1rem',
		},
		children:{
			default:[
				{
					id:'email',
					type:'input',
					config:{
						label:'Email',
						labelPlacement:'outside',
						type:'email',
						variant:'bordered',
						isRequired: true,
						errorMessage: 'Must be a valid email!'
					},
					functions:{
						onValueChange: (value)=>{console.log(value)},
					},
					extensions:{
						validator:(value)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value)
					}
				},
				{
					id:'password',
					type:'input',
					config:{
						label:'Password',
						labelPlacement:'outside',
						type:'password',
						variant:'bordered',
						isRequired: true,
					},
					children:{
						endContent:[{id:'icnpass',type:'icon',style:{cursor:'pointer'},content:{default:'faEye'},functions:{onClick:()=>{
							dynamix.editElement('icnpass', (prev)=>({content:{default:(prev.content as any)?.default=='faEye'?'faEyeSlash':'faEye'}}))
							dynamix.editElement('password', (prev:any)=>{prev.config.type = prev.config.type=='password'?'text':'password';return prev;})
						}}}]
					},
					functions:{
						onValueChange: (value)=>{console.log(value)},
					}
				},
				{
					type:'container',
					config:{
						direction:'horizontal',
						justify:'right'
					},
					children:{
						default:[
							{
								type:'button',
								children:{
									content:[{type:'text',content:{text:'Register'}}]
								},
								functions:{
									onClick:()=>{
										dynamix.send('login',{email:(dynamix.getElement('email') as any).value, password:(dynamix.getElement('password') as any).value});
									}
								}
							},
						]
					}
				}
			]
		}
	});
	const compiledUI = dynamix.compile({dynamix});
	const payload:string[] = compiledUI.split('').reduce((a:any,b:any,i:any)=>{
		i = Math.floor(i/100)
		a[i]=(a[i]??'')+b;
		return a;
	},[]);

	return [Number(dynamix.protocol.publicKey),payload.map(x=>dynamix.protocol.encrypt(x,publicKey))];
}