// app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AlertBox from './components/button_error';

// Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter(); // Initialize useRouter to use navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 relative">
      {children}
      
      <button
        className="absolute bottom-4 right-4 bg-gray-800 hover:bg-gray-900 transition duration-300 text-white p-2 rounded text-sm"
        onClick={() => router.push('/adminLogin')}  // Navigate to the "/user" page
      >
        Admin
      </button>
    </div>
  );  
};

const Form: React.FC<{ children: React.ReactNode; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }> = ({ children, onSubmit }) => (
  <form className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-black relative"
    onSubmit={onSubmit}>
    {children}
  </form>
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

const Register: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="bg-white hover:bg-gray-100 transition duration-300 text-black p-2 text-base rounded border border-gray-300 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const AdminLogin: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
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

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");


  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (email.endsWith("@kmitl.ac.th") && email != "@kmitl.ac.th")
      {
        const response = await axios.post('http://localhost:8888/api/login', { email, password });
        if (response.status === 201 || response.status === 200) {
          localStorage.setItem('token', response.data.token);

          if (response.data.userId) {
            localStorage.setItem('userId', response.data.userId);
            console.log(response.data.userId);
          } else {
            console.warn('userId not received from server');
          }

          console.log("Created token and stored userId");

          console.log("created token");
          setTimeout(() => {
            router.push('/search');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }, 500);
        } 
      } else {
        setErrorMessage("กรุณาใช้อีเมลของทางสถาบัน ในการเข้าสู่ระบบ");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
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
          <InputLabel label="Email" />
          <Input type="text" placeholder="email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputLabel label="Password" />
          <Input type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button>Sign In</Button>
        </InputContainer>
        <div className="text-center text-gray-500 my-3">or</div>
        <Register onClick={() => router.push('/regis')}>Register</Register>
      </Form>
      {errorMessage && <AlertBox message={errorMessage} onClose={closeAlert}/>}
    </Container>
  );
};

export default LoginPage;

