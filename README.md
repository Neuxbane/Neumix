# Neumix
Please contribute on this repo by giving new feature on the `DynamicUI` component 🙏. This abstract bellow are written by ChatGPT by understanding the component and the target.

# Todo
- routing page
- API
- lazyload

## Preview
![preview1](/screenshoots/preview1.png)
![preview2](/screenshoots/preview2.png)

## Abstract
Neumix is a dynamic UI renderer built with React and integrated with NextUI components. It allows developers to define UI elements in a JSON structure, making it easy to create, modify, and manage user interfaces dynamically. This component leverages TypeScript for type safety and better coding practices, ensuring a seamless development experience.

## Keywords
- JSON UI components
- Dynamic UI components
- React dynamic rendering
- NextUI JSON UI
- React interface elements
- UI element configuration
- React functional components
- TypeScript React UI
- Customizable UI in React
- Dynamic form elements
- React component rendering

## Getting Started

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/neuxbane/Neumix.git
   cd Neumix
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

### Usage

1. Import and use the `DynamicUI` component in your React application. Ensure you define the necessary action handlers.

```tsx
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
   ```

2. Run your React application to see the dynamically rendered UI.

### Documentation
For more details and examples, please refer to the [documentation](./docs).

## Contributing
Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.