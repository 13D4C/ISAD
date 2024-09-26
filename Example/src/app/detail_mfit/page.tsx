import React from 'react';
import CourseDetail from '../components/CourseDetail';
import SectionDetail from '../components/SectionDetail';

const Home: React.FC = () => {
  const course = {
    code: "06016401",
    name: "MATHEMATICS FOR INFORMATION TECHNOLOGY",
    faculty: "Information Technology",
    department: "เทคโนโลยีสารสนเทศ",
    type: "LEC",
    credits: "3(3-0-6)",
    midtermExam: "อังคาร 29 สิงหาคม 2566 09:30 - 12:30", 
    finalExam: "อังคาร 31 ตุลาคม 2566 09:30 - 12:30",
    gradingMethod: "เป็นไปตามอาจารย์ผู้สอน",
    descriptionTH: "ลิมิตและความต่อเนื่องอนุพันธ์ของฟังก์ชันอนุพันธ์อันดับสูงการประยุกต์ของอนุพันธ์ปัญหาค่าสูงสุดและต่ำสุดของฟังก์ชัน การอินทิเกรตและเทคนิคของการอินทเกรต การประยุกต์ของการอินทิเกรตฟังก์ชันสองตัวแปร อนุพันธ์ย่อยพีชคณิตเชิงเส้น เมทริกซ์และดีเทอร์มิแนนท์ ระบบสมการเชิงเส้นและการหาผลเฉลยของระบบสมการเชิงเส้น เวกเตอร์สเปซ การแปลงเชิงเส้น การแปลงเมทริกซ์ เมทริกซ์เชิงตั้งฉาก",
    descriptionEN: "Limit and continuation of derivatives of high-rank derivative functions, application of derivatives, problems of maximum and minimum values of functions. Integration and Integration Techniques Application of Two-Variable Function Integration, Linear Algebra Sub-Derivatives, Matrix and Determinant Linear Equation System and Linear Equation System Solution Calculation Vector Space Linear Conversion Matrix Transformation, Perpendicular Matrix",
  };

  const section1 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 1 -73",
    section: "1",
    instructors: ["ผศ.ดร. สมเกียรติ วังศิริพิทักษ์, ผศ.ดร. ประพันธ์ ปวรางกูร"],
    
    schedule: [
      { day: "TUE", time: "09:00-12:00", room: "M22", type: "LEC" },
    ],
  };
  const section2 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 74-146",
    section: "2",
    instructors: ["ผศ.ดร. สมเกียรติ วังศิริพิทักษ์, ผศ.ดร. ประพันธ์ ปวรางกูร"],
    schedule: [
      { day: "TUE", time: "13:00 - 16:00", room: "M22", type: "LEC" },
      { day: "WED", time: "14:00 - 16:00", room: "CHALE 609", type: "FWK" },
    
    ],
  };
  const section3 = {
    group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 147-220",
    section: "3",
    instructors: ["ผศ.ดร. สมเกียรติ วังศิริพิทักษ์, ผศ.ดร. ประพันธ์ ปวรางกูร"],
    schedule: [
      { day: "Wed", time: "13:00 - 16:00", room: "M04", type: "LEC" },
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