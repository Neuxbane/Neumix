"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import DynamicUI, { allElements } from '@/components/dynamix';

const Home: NextPage = () => {
  const [elements, setElements] = useState<allElements[]>([
    { type: 'avatar', content: 'https://via.placeholder.com/150', style: { width: '100px', height: '100px' } },
    { type: 'button', content: 'Click me', action: () => alert('Button clicked!') },
    {
      type: 'card',
      title: 'Card Title',
      avatar: 'https://via.placeholder.com/50',
      content: [{ type: 'text', content: 'Card Content', size: 'p' }],
      footer: { left: [{ type: 'text', content: 'Left Footer', size: 'p' }], middle: [], right: [{ type: 'text', content: 'Right Footer', size: 'p' }] },
    },
    { type: 'input', placeholder: 'Enter text'},
    { type: 'text-area', placeholder: 'Enter more text'},
    { type: 'select', placeholder: 'Select an option', value: '', options: ['Option 1', 'Option 2'], selectionMode: 'single' },
    { type: 'switch', value: 'false' },
    { type: 'slider'},
    { type: 'image', src: 'https://via.placeholder.com/300', style: { width: '300px' } },
    { type: 'text', content: 'This is a text element', size: 'h1' },
    {
      type: 'modal',
      id: 'modal-1',
      header: [{ type: 'text', content: 'Modal Header', size: 'h3' }],
      content: [{ type: 'text', content: 'Modal Content', size: 'p' }],
      footer: [{ type: 'button', content: 'Close', action: () => alert('Modal closed!') }],
    },
    {
      type: 'tabs',
      content: [
        { name: 'Tab 1', content: [{ type: 'text', content: 'Content of Tab 1', size: 'p' }] },
        { name: 'Tab 2', content: [{ type: 'text', content: 'Content of Tab 2', size: 'p' }] },
      ],
    },
	{type: 'button', action: () => {
		setElements(prevElements => [
		  ...prevElements,
		  { type: 'text', content: 'New Text Element', size: 'h2', style: { color: 'blue' } },
		]);
	  }, content: "test"}
  ]);
  return (
    <div>
      <h1>Dynamic UI Test</h1>
      <DynamicUI elements={elements} />
    </div>
  );
};

export default Home;
