// app/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter(); // Initialize useRouter to use navigation
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 relative">
        {children}
        
        <button
          className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded text-sm"
          onClick={() => router.push('/')}  // Navigate to the "/user" page
        >
          User
        </button>
      </div>
    );
  };

const Form: React.FC<{ children: React.ReactNode; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ children, onSubmit }) => (
  <form className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-black relative" onSubmit={onSubmit}>
    {children}
  </form>
);

const Header: React.FC = () => (
  <div className="mb-4 text-left">
    <h1 className="text-3xl font-bold m-0">Welcome</h1>
    <p>Admin User</p>
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

const Input: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, placeholder, value, onChange }) => (
  <input
    className="mb-3 p-2 text-base rounded border border-gray-300 w-full"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <button
    type="submit" // Set type to submit to trigger form submission
    className="bg-blue-600 text-center text-white p-2 text-base rounded cursor-pointer mb-2"
  >
    {children}
  </button>
);


const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
          const response = await axios.post('http://localhost:8888/api/adminLogin', { username, password });
          if (response.status === 201 || response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            console.log("created token");
            setTimeout(() => {
              router.push('/search'); // Refresh the page after a delay
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }, 500);
          } else {
            console.error("Incorrect ID or Password!!!");
          }
      } catch (error) {
        console.error('Error logging in', error);
        if (axios.isAxiosError(error) && error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    };
    return (
      <Container>
        <Form onSubmit={handleSignIn}>
          <Header />
          <InputContainer>
            <InputLabel label="Username" />
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputLabel label="Password" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button>Sign In</Button>
          </InputContainer>
        </Form>
      </Container>
  );
};

 
export default AdminLoginPage;