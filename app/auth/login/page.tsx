"use client";

import React, { useState } from 'react';
import DynamicUI, { allElements } from '@/components/dynamix';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const loginElements: allElements[] = [
    {
      type: 'container',
      display: 'vertical',
      style: {padding: '0 20dvw'},
      content: [
        {
          type: 'text',
          content: 'Login',
          size: 'h1'
        },
        {
          type: 'input',
          inputType: 'email',
          placeholder: 'Email',
          value: email,
          action: handleEmailChange
        },
        {
          type: 'input',
          inputType: 'password',
          placeholder: 'Password',
          value: password,
          action: handlePasswordChange
        },
        {
          type: 'button',
          content: 'Login',
          action: handleLogin
        }
      ]
    }
  ];

  return (
    <DynamicUI elements={loginElements} />
  );
};

export default LoginPage;
