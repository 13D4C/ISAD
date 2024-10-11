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
