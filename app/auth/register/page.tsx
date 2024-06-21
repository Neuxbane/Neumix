"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import Dynamix from '@/components/dynamix';
let rerender = ()=>{};
const dynamix = new Dynamix(rerender); // Create an instance of Dynamix

// Example elements to be added to the 'root' container

dynamix.addModal({
		"type": "modal",
		"id": "modal1",
		"config": {
		  "size": "lg",
		  "isOpen": true,
		  "placement": "center",
		  "scrollBehavior": "inside",
		  "backdrop": "blur",
		},
		"children": {
		  "header": [
			{
			  "type": "text",
			  "id": "headerText",
			  "content": {
				"text": "This is the header"
			  }
			}
		  ],
		  "body": [
			{
			  "type": "text",
			  "id": "bodyText",
			  "content": {
				"text": "This is the body content"
			  }
			},
			{
			  "type": "input",
			  "id": "input1",
			  "config": {
				"placeholder": "Enter text here",
				"type": "text"
			  }
			}
		  ],
		  "footer": [
			{
			  "type": "button",
			  "id": "closeButton",
			  "config": {
				"color": "primary",
				"size": "md",
				"variant": "solid",
				"isDisabled": false,
				"isLoading": false
			  },
			  "functions": {
				"onClick": () => dynamix.toggleModal('modal1')
			  },
			  "children": {
				"content": [
				  {
					"type": "text",
					"id": "buttonText",
					"content": {
					  "text": "Close"
					}
				  }
				]
			  }
			}
		  ]
		}
})

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
							},
							functions:{
								onClick: () => dynamix.toggleModal('modal1')
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
