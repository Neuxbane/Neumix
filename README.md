# Neumix
Please contribute on this repo by giving new feature on the `DynamicUI` component 🙏. This abstract bellow are written by ChatGPT by understanding the component and the target.

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

1. Define your UI elements in a JSON structure. Here is an example JSON configuration:

   ```json
   [
       {
         "type": "text",
         "size": "h1",
         "content": "Welcome to Dynamic UI",
         "style": { "color": "blue" }
       },
       {
         "type": "input",
         "placeholder": "Enter your name",
         "inputType": "text",
         "style": { "margin": "10px 0" },
         "action": handleInputChange
       },
       {
         "type": "button",
         "content": "Submit",
         "action": handleSubmit,
         "style": {
           "backgroundColor": "green",
           "color": "white"
         },
       },
       {
         "type": "card",
         "title": "Card Title",
         "style": { "margin": "20px 0" },
         "content": [
           {
             "type": "text",
             "size": "p",
             "content": "This is a card content"
           },
           {
             "type": "button",
             "content": "Click Me",
             "action": handleCardButtonClick
           }
         ],
       }
     ]
   ```

2. Import and use the `DynamicUI` component in your React application. Ensure you define the necessary action handlers.

   ```javascript
   import React from 'react';
   import DynamicUI, { allElements } from '@/components/dynamix';

   // Define action handlers
   const handleInputChange = (e) => {
     console.log('Input changed:', e.target.value);
   };

   const handleSubmit = () => {
     console.log('Submit button clicked');
   };

   const handleCardButtonClick = () => {
     console.log('Card button clicked');
   };

   // JSON structure defining the UI elements
   const json =    [
      {
         "type": "text",
         "size": "h1",
         "content": "Welcome to Dynamic UI",
         "style": { "color": "blue" }
      },
      {
         "type": "input",
         "placeholder": "Enter your name",
         "inputType": "text",
         "style": { "margin": "10px 0" },
         "action": handleInputChange
      },
      {
         "type": "button",
         "content": "Submit",
         "action": handleSubmit,
         "style": {
            "backgroundColor": "green",
            "color": "white"
         },
      },
      {
         "type": "card",
         "title": "Card Title",
         "style": { "margin": "20px 0" },
         "content": [
            {
               "type": "text",
               "size": "p",
               "content": "This is a card content"
            },
            {
               "type": "button",
               "content": "Click Me",
               "action": handleCardButtonClick
            }
         ],
      }
   ];

   const App = () => {
     return <DynamicUI elements={json.elements as allElements[]} />;
   };

   export default App;
   ```

3. Run your React application to see the dynamically rendered UI.

### Documentation
For more details and examples, please refer to the [documentation](./docs).

## Contributing
Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.