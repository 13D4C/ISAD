import React from 'react';
import CourseDetail from '../components/CourseDetail';
import SectionDetail from '../components/SectionDetail';

const Home: React.FC = () => {
  const course = {
    subject_id: "06066304",
    name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
    major: "เทคโนโลยีสารสนเทศ",
    style: "LEC",
    credit: 3,
    sections: [
      {
          subject_id: "06066304",
          section: 1,
          professor: "Dr. Somchai",
          schedule: [
              {
                  day: "Monday",
                  time: "10:00 - 12:00",
                  room: "Room 101",
              },
              {
                  day: "Wednesday",
                  time: "10:00 - 12:00",
                  room: "Room 101",
              },
          ],
          style: "LEC",
      },
      {
          subject_id: "06066304",
          section: 2,
          professor: "Prof. Boonprasert",
          schedule: [
              {
                  day: "Tuesday",
                  time: "13:00 - 15:00",
                  room: "Room 202",
              },
              {
                  day: "Thursday",
                  time: "13:00 - 15:00",
                  room: "Room 202",
              },
          ],
          style: "LEC",
      },
  ],
    professors: ["Boonprasert", "Somchai"],
    midterm: new Date("2024-10-20"),
    final: new Date("2024-12-15"),
    midtermTime: "13:30 - 16:30",
    finalTime: "13:30 - 16:30",
    detail: "การพัฒนาโดยใช้แนวคิดเชิงวัตถุ การวิเคราะห์และออกแบบ การเลือกโครงการและการจัดการ โครงการสารสนเทศ กำหนดความต้องการระบบ การวิเคราะห์ด้วยยูสเคส แบบจำลองกระบวนการ แบบจำลองข้อมูล การออกแบบสถาปัตยกรรมและกลยุทธการออก การออกแบบส่วนติดต่อกับผู้ใช้ การออกแบบส่วนจัดเก็บข้อมูล การออกแบบโปรแกรม คลาสและเมธอด การสร้างและการติดตั้งระบบ",
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
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-200 p-8">
      <div className="w-full max-w-7xl">
        {/* Course Details */}
        <div className="mb-20"> {/* เพิ่ม margin-bottom */}
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