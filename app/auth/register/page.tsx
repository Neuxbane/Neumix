"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import Dynamix from '@/components/dynamix';
let rerender = ()=>{};
const dynamix = new Dynamix(rerender); // Create an instance of Dynamix

// Example elements to be added to the 'root' container

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
				type:'input',
				config:{
					label:'Email',
					type:'email',
					variant:'bordered',
				},
				functions:{
					onValueChange: (value)=>{console.log(value)},
				}
			},
			{
				id:'password',
				type:'input',
				config:{
					label:'Passowrd',
					type:'password',
					variant:'bordered',
				},
				functions:{
					onValueChange: (value)=>{console.log(value)},
				}
			},
			{
				type:'container',
				config:{
					direction:'horizontal',
					justify:'space-between'
				},
				children:{
					default:[
						{
							type:'button',
							children:{
								content:[{type:'text',content:{text:'Hello my name is jeff'}}]
							}
						},
						{
							type:'button',
							children:{
								content:[{type:'text',content:{text:'jeff'}}]
							}
						}
					]
				}
			}
		]
	}
});

const Page: NextPage = () => {
	const [, setTick] = useState(0);
	rerender = () => setTick((tick) => (tick + 1) % 100); // State to trigger re-render
	dynamix.fetchRerender(rerender);

	return <>{dynamix.compile()}</>;
};

export default Page;
