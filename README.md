# ISAD
Project Information System Analysis Design


# Installation Plan

## 1. Introduction
เนื่องจากระบบยังอยู่ในระยะ Prototype การติดตั้งและใช้งานยังต้องดำเนินการโดยผู้ใช้ ซึ่งจำเป็นต้องติดตั้ง **Prerequisites** ก่อนการใช้งาน ทั้งในส่วนของ Frontend และ Backend เพื่อให้สามารถทดสอบและพัฒนาต่อได้

## 2. Prerequisites
- **System**: ต้องติดตั้ง Node.js เพื่อให้สามารถจัดการกับโค้ดที่ใช้ใน Backend และ Frontend ได้
- **Frontend**: 
  - npm
  - axios
- **Backend**:  
  - dotenv
  - mongoose
  - jsonwebtoken
  - express
  - bcrypt

## 3. Installation Steps
### Backend Library Installation  
ขั้นตอนการติดตั้ง Library ที่จำเป็นสำหรับ Backend:

1. ติดตั้ง dotenv สำหรับจัดการ environment variables  
   ```bash
   npm i dotenv
   ```
2. ติดตั้ง mongoose สำหรับเชื่อมต่อกับ MongoDB
   ```bash
   npm i mongoose
   ```
3. ติดตั้ง jsonwebtoken สำหรับการจัดการ token-based authentication
   ```bash
   npm i jsonwebtoken
   ```
4. ติดตั้ง express สำหรับสร้าง RESTful APIs
   ```bash
   npm i express
   ```
5. ติดตั้ง bcrypt สำหรับ hashing ข้อมูล เช่น password
   ```bash
   npm install bcrypt
   ```
# Frontend Installation
1. ติดตั้ง Node.js บนเครื่องผู้ใช้
2. รันคำสั่งเพื่อติดตั้ง dependencies ทั้งหมดที่ระบุใน package.json
    ```bash
   npm install
   ```
3. ติดตั้ง axios สำหรับการเรียกใช้งาน API ในฝั่ง Frontend
   ```bash
   npm i axios
   ```
# Usage
Frontend
```bash
   npm run dev
   ```
Backend
```bash
   npm run dev
   ```


