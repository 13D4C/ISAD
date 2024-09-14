// app/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// Components
const Container: React.FC = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600">
    {children}
  </div>
);

const Form: React.FC = ({ children }) => (
  <div className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-black relative">
    {children}
  </div>
);

const Header: React.FC = () => (
  <div className="mb-4 text-left">
    <h1 className="text-3xl font-bold m-0">Welcome</h1>
    <p>Sign in with KMITL account Or ITKMITL account.</p>
  </div>
);

const InputContainer: React.FC = ({ children }) => (
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
  return  <button
    type='button'
    className="bg-blue-600 text-center text-white p-2 text-base rounded cursor-pointer mb-2"
    onClick={() =>router.push('/')}
  >
    {children}
  </button>
};


// Main LoginPage component
const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    // คุณสามารถใส่ logic การตรวจสอบ username และ password ได้ที่นี่
    // ถ้าตรวจสอบสำเร็จ สามารถ redirect ไปที่หน้าที่ต้องการได้
    router.push('/page'); // ตัวอย่างการนำไปยังหน้าที่ชื่อว่า /li
  };

  return (
    <Container>
      <Form>
        <Header />
        <InputContainer>
          <InputLabel label="Name" />
          <Input type="text" placeholder="Name" />
          <InputLabel label="Email" />
          <Input type="text" placeholder="Username" />
          <InputLabel label="Password" />
          <Input type="password" placeholder="Password" />
          <Button onClick={handleSignIn}>
  Register
</Button>

        </InputContainer>
      </Form>
    </Container>
  );
};

export default LoginPage;
