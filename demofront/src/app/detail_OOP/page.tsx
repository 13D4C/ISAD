import React from 'react';
import CourseDetail from '../components/CourseDetail';
import SectionDetail from '../components/SectionDetail';

const Home: React.FC = () => {
  const course = {
    code: "06016408 ",
    name: "OBJECT-ORIENTED PROGRAMMING",
    faculty: "Information Technology",
    department: "เทคโนโลยีสารสนเทศ",
    type: "LEC-LAB",
    credits: "3(3-0-6)",
    midtermExam: "จันทร์ 22 มกราคม 2567 13:30 - 16:30", 
    finalExam: "จันทร์ 18 มีนาคม 2567 13:30 - 16:30",
    gradingMethod: "เป็นไปตามอาจารย์ผู้สอน",
    descriptionTH: "การออกแบบและพัฒนาโปรแกรมเชิงอ็อบเจกต์ หลักการห่อหุ้ม คลาสและอ็อบเจกต์ เมธอดและการส่งสาร การสืบทอดคุณลักษณะ ภาวะพหุสัณฐาน การพัฒนาส่วนต่อประสานกราฟิกกับผู้ใช้และการจัดการกับเหตุการณ์ อาร์เรย์และคอลเลคชัน การจัดการกับสิ่งผิดปกติ คลาสที่เกี่ยวข้องกับอินพุตและเอาต์พุต เธรด",
    descriptionEN: "Design and Development of Object-Oriented Programs, Encapsulation Principles Classes and Objects Methods and Transmission, Inheritance of Attributes, Polymorphism. Developing a graphical user interface and handling events. Arrays and Collections Dealing with irregularities Classes related to input and output, threads",
  };

  const section1 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 1 -73",
    section: "1",
    instructors: ["ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์","ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์"],
    
    schedule: [
      { day: "MON", time: "09:00-11:00", room: "M03", type: "LEC" },
      { day: "FRI", time: "09:00-11:00", room: "L203", type: "LAB" }
    ],
  };
  const section2 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 74-146",
    section: "2",
    instructors: ["ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์","ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์"],
    schedule: [
      { day: "MON", time: "11:00-13:00", room: "M03", type: "LEC" },
      { day: "FRI", time: "09:00-11:00", room: "L203", type: "LAB" }
    ],
  };
  const section3 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 147-220",
    section: "3",
    instructors: ["ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์","ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์"],
    schedule: [
      { day: "MON", time: "14:00-16:00", room: "M03", type: "LEC" },
      { day: "FRI", time: "09:00-11:00", room: "L203", type: "LAB" }
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
