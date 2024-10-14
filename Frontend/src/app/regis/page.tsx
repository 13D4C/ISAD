// app/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AlertBox from '../components/button_error';

// Components
const Container: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
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
    <p>Sign in with KMITL account Or ITKMITL account.</p>
  </div>
);

const InputContainer: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
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

const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return <button
    className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-center text-white p-2 text-base rounded cursor-pointer mb-2"
    type="submit"
  >
    {children}
  </button>
};


const RegisPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();


  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (email.endsWith("@kmitl.ac.th") && email != "@kmitl.ac.th") {
        const response = await axios.post('http://localhost:8888/api/register', { username, email, password }); // ถ้า deploy ต้องแก้ path
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          console.log("redirect...");
          router.push('/');
        } 
      } else {
        setErrorMessage("กรุณาใช้อีเมลของทางสถาบัน ในสร้างบัญชี");
      }
    } catch (error: any) {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };
  const closeAlert = () => {
    setErrorMessage("");
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <Header />
        <InputContainer>
          <InputLabel label="Name" />
          <Input type="text" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputLabel label="Email" />
          <Input type="text" placeholder="email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputLabel label="Password" />
          <Input type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button>Register</Button>
        </InputContainer>
      </Form>
      {errorMessage && <AlertBox message={errorMessage} onClose={closeAlert} />}
    </Container>
  );
};

export default RegisPage;
