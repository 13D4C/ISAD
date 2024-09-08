"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600">
    {children}
  </div>
);

const Form: React.FC<{ children: React.ReactNode; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }> = ({ children, onSubmit }) => (
  <form className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-black relative"
    onSubmit={onSubmit}>
    {children}
  </form>
);

const Header: React.FC = () => (
  <div className="mb-4 text-left">
    <h1 className="text-3xl font-bold m-0">Welcome</h1>
    <p>Sign in with your account.</p>
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

const Input: React.FC<{ type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ type, placeholder, value, onChange }) => (
  <input
    className="mb-3 p-2 text-base rounded border border-gray-300 w-full"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Button: React.FC<{ children: React.ReactNode; type: "submit" }> = ({ children, type }) => {
  const router = useRouter();
  return (
    <button
      className="bg-blue-600 text-white p-2 text-base rounded cursor-pointer mb-2"
      type={type}
    >
      {children}
    </button>
  );
};

const GoogleButton: React.FC = () => (
  <button className="bg-white text-black p-2 text-base rounded border border-gray-300 flex items-center justify-center">
    <img
      src="https://img.icons8.com/color/16/000000/google-logo.png"
      alt="Google logo"
      className="mr-2"
    />
    Login
  </button>
);

// Main LoginPage component
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (email.slice(-12) == "@kmitl.ac.th") {
        const response = await axios.post('http://localhost:8888/login', { email, password });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          router.push('/lima'); // Redirect to a protected route or dashboard
        }
      } else {
        console.error('Your email is not correct');
      }
    } catch (error) {
      console.error('Error logging in', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <Header />
        <InputContainer>
          <InputLabel label="Email" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel label="Password" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </InputContainer>
        <div className="text-center text-gray-500 my-3">or</div>
        <GoogleButton />
      </Form>
    </Container>
  );
};
export default LoginPage;