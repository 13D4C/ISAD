// pages/Home.tsx
import React from 'react';
import CourseDetail from '../components/CourseDetail';

const Home: React.FC = () => {
  const course = {
    code: "06066304",
    name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
    faculty: "Information Technology",
    department: "เทคโนโลยีสารสนเทศ",
    type: "LEC",
    credits: "3(3-0-6)",
    midtermExam: "เสาร์ 2 กันยายน 2566 13:30 - 16:30", 
    finalExam: "ศุกร์ 3 พฤศจิกายน 2566 13:30 - 16:30",
    gradingMethod: "เป็นไปตามอาจารย์ผู้สอน",
    description: "การพัฒนาโดยใช้แนวคิดเชิงวัตถุ การวิเคราะห์และออกแบบ การเลือกโครงการและการจัดการ โครงการสารสนเทศ กำหนดความต้องการระบบ การวิเคราะห์ด้วยยูสเคส แบบจำลองกระบวนการ แบบจำลองข้อมูล การออกแบบสถาปัตยกรรมและกลยุทธการออก การออกแบบส่วนติดต่อกับผู้ใช้ การออกแบบส่วนจัดเก็บข้อมูล การออกแบบโปรแกรม คลาสและเมธอด การสร้างและการติดตั้งระบบ",
    
    sections: [
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 1 -73",
        section: "1",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "TUE", time: "09:00-12:00", room: "M23", type: "LEC" },
        ],
      },
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 74-146",
        section: "2",
        instructors: ["ผศ.ดร. พัฒนพงษ์ ฉันทมิตรโอภาส"],
        schedule: [
          { day: "TUE", time: "09:00-12:00", room: "M03", type: "LEC" },
        ],
      },
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 147-220",
        section: "3",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "TUE", time: "13:00 - 16:00", room: "M23", type: "LEC" },
        ],
      },
    ],
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
      <div className="w-full max-w-7xl">
        <CourseDetail course={course} />
      </div>
    </div>
  );
};

export default Home;
