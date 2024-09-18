// app/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter(); // Initialize useRouter to use navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 relative">
      {children}
      
      <button
        className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-sm"
        onClick={() => router.push('/admin')}  // Navigate to the "/user" page
      >
        User
      </button>
    </div>
  );
};

const Form: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-black relative">
    {children}
  </div>
);

const Header: React.FC = () => (
  <div className="mb-4 text-left">
    <h1 className="text-3xl font-bold m-0">Welcome</h1>
    <p>Sign in with KMITL account or ITKMITL account.</p>
  </div>
);

const InputContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col bg-white p-4 rounded-lg mb-4 border border-gray-200">
    {children}
  </div>
);

const InputLabel: React.FC<{ label: string }> = ({ label }) => (
  <label className="mb-1 text-sm font-bold">{label}</label>
);

const Input: React.FC<{ type: string; placeholder: string }> = ({ type, placeholder }) => (
  <input
    className="mb-3 p-2 text-base rounded border border-gray-300 w-full"
    type={type}
    placeholder={placeholder}
  />
);

const Button: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="bg-blue-600 text-center text-white p-2 text-base rounded cursor-pointer mb-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const GoogleButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  const router = useRouter();
  return (
    <button
      className="bg-white text-black p-2 text-base rounded border border-gray-300 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Main LoginPage component
const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    // Logic for checking username and password can go here
    // If successful, redirect to the desired page
    router.push('/li'); // Example of navigation to the /li page
  };

  return (
    <Container>
      <Form>
        <Header />
        <InputContainer>
          <InputLabel label="Username" />
          <Input type="text" placeholder="Username" />
          <InputLabel label="Password" />
          <Input type="password" placeholder="Password" />
          <Button onClick={handleSignIn}>Sign In</Button>
        </InputContainer>
        <div className="text-center text-gray-500 my-3">or</div>
        <GoogleButton onClick={() => router.push('/regis')}>Register</GoogleButton>
      </Form>
    </Container>
  );
};

export default LoginPage;
