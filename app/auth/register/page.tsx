"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import Dynamix from '@/components/dynamix';
let rerender = ()=>{};
const dynamix = new Dynamix(rerender); // Create an instance of Dynamix

// Example elements to be added to the 'root' container
dynamix.appendElement('root', {
	type: 'text',
	content: 'Register',
	style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' },
});

dynamix.appendElement('root', {
	type: 'input',
	id: 'email',
	inputType: 'email',
	placeholder: 'Email',
	onChange: (val) => {
		console.log(val);
	},
});

dynamix.appendElement('root', {
	type: 'input',
	id: 'password',
	inputType: 'password',
	placeholder: 'Password',
	onChange: (val) => {
		console.log(val);
	},
});

dynamix.appendElement('root', {
	type: 'button',
	id:'btn-passwd',
	content: 'Show password',
	onClick: () => {
		dynamix.editElement('password', (prev) => ({
			inputType: prev.inputType === 'text' ? 'password' : 'text',
		}));
		dynamix.editElement('btn-passwd', (prev)=>({
			content:prev.content==='Show password'?'Hide password':'Show password'
		}))
	},
});

dynamix.editElement('root', ()=>({gap:'1rem'}))
const Page: NextPage = () => {
	const [, setTick] = useState(0);
	rerender = () => setTick((tick) => (tick + 1) % 100); // State to trigger re-render
	dynamix.fetchRerender(rerender);

	return <>{dynamix.compile()}</>;
};

export default Page;
