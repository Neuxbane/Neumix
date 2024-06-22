"use client";

import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Dynamix from '@/libs/dynamix/dynamix.client';
import { dynamixUIRegister } from '../actions';




const dynamix = new Dynamix(() => {}); // Create an instance of Dynamix
const Page: NextPage = () => {
	const [tick, setTick] = useState(0);
	// Using useEffect to ensure rerender function is set properly
	useEffect(() => {
		const rerender = () => setTick((tick) => ((tick + 1) % 100)+1); // State to trigger re-render
		dynamix.fetchRerender(rerender);
	}, []);

	(async()=>{
		const [serverPublicKey, content] = await dynamixUIRegister(dynamix.protocol.publicKey);
		if(!tick)dynamix.renderFromServer((content as any).map((x:any)=>dynamix.protocol.decrypt(x, serverPublicKey)).join(''));
	})();

	return <>{dynamix.compile()}</>;
};

export default Page;
