import React from 'react';
import CourseDetail from './components/CourseDetail';
import SectionDetail from './components/SectionDetail';

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
    descriptionTH: "การพัฒนาโดยใช้แนวคิดเชิงวัตถุ การวิเคราะห์และออกแบบ การเลือกโครงการและการจัดการ โครงการสารสนเทศ กำหนดความต้องการระบบ การวิเคราะห์ด้วยยูสเคส แบบจำลองกระบวนการ แบบจำลองข้อมูล การออกแบบสถาปัตยกรรมและกลยุทธการออก การออกแบบส่วนติดต่อกับผู้ใช้ การออกแบบส่วนจัดเก็บข้อมูล การออกแบบโปรแกรม คลาสและเมธอด การสร้างและการติดตั้งระบบ",
    descriptionEN: "Material-based development, analysis and design, project selection and management. Information Project Determine system requirements Analysis with use cases, process models, data models, architectural design and exit strategies. User Interface Design, Storage Unit Design, Program Design, Classes and Methods, System Creation and Installation",
  };

  const section1 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 1 -73",
    section: "1",
    instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
    
    schedule: [
      { day: "TUE", time: "09:00-12:00", room: "M23", type: "LEC" },
    ],
  };
  const section2 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 74-146",
    section: "2",
    instructors: ["ผศ.ดร. พัฒนพงษ์ ฉันทมิตรโอภาส"],
    schedule: [
      { day: "TUE", time: "09:00-12:00", room: "M03", type: "LEC" },
    
    ],
  };
  const section3 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 147-220",
    section: "3",
    instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
    schedule: [
      { day: "TUE", time: "13:00 - 16:00", room: "M23", type: "LEC" },
    ],
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-7xl">
        {/* Course Details */}
        <div className="mb-10"> {/* เพิ่ม margin-bottom */}
          <CourseDetail course={course} />
        </div>

        {/* Spacer for better layout */}
        <div className="mt-6"></div>

        {/* Section Details */}
        <div className="space-y-8"> {/* เพิ่ม margin-bottom ระหว่าง SectionDetail */}
          <SectionDetail 
            group={section1.group} 
            section={section1.section} 
            instructors={section1.instructors} 
            schedule={section1.schedule} 
          />
          <SectionDetail 
            group={section2.group} 
            section={section2.section} 
            instructors={section2.instructors} 
            schedule={section2.schedule} 
          />
          <SectionDetail 
            group={section3.group} 
            section={section3.section} 
            instructors={section3.instructors} 
            schedule={section3.schedule} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
