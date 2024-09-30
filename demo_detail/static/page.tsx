// pages/Home.tsx
"use client";
import React from 'react';
import CourseDetail from '../components/CourseDetail';

const Home: React.FC = () => {
  const course = {
    code: "06066304",
    name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
    faculty: "Information Technology",
    department: "Information Technology",
    type: "Lecture",
    credits: "3(3-0-6)",
    midtermExam: "02 Nov 2023",
    finalExam: "22 Dec 2023",
    gradingMethod: "Letter Grade",
    description: "การพัฒนาโดยใช้แนวคิดเชิงวัตถุ การวิเคราะห์และออกแบบ การเลือกโครงการและการจัดการ โครงการสารสนเทศ กำหนดความต้องการระบบ การวิเคราะห์ด้วยยูสเคส แบบจำลองกระบวนการ แบบจำลองข้อมูล การออกแบบสถาปัตยกรรมและกลยุทธการออก การออกแบบส่วนติดต่อกับผู้ใช้ การออกแบบส่วนจัดเก็บข้อมูล การออกแบบโปรแกรม คลาสและเมธอด การสร้างและการติดตั้งระบบ",
    sections: [
      {
        group: "A",
        section: "01",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "Tuesday", time: "13:00 - 16:00", room: "M23", type: "Lecture" },
        ],
      },
      {
        group: "B",
        section: "02",
        instructors: ["ผศ.ดร. พัฒนพงษ์ ฉันทมิตรโอภาส"],
        schedule: [
          { day: "Tuesday", time: "09:00 - 12:00", room: "M04", type: "Lecture" },
        ],
      },
      {
        group: "C",
        section: "03",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "Tuesday", time: "09:00 - 12:00", room: "M23", type: "Lecture" },
        ],
      },
    ],
  };

  return <CourseDetail course={course} />;
};

export default Home;
