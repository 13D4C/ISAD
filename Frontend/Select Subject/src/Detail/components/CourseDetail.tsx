// components/CourseDetail.tsx
import React from 'react';

type Course = {
  code: string;
  name: string;
  faculty: string;
  department: string;
  type: string;
  credits: number;
  midtermExam: string;
  finalExam: string;
  gradingMethod: string;
  descriptionTH: string;
  descriptionEN: string;
};

const CourseDetail: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="w-full max-w-7xl h-full p-6 bg-white rounded-xl shadow-lg">
      <button className="text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out">
  &larr; Back
</button>

      <h1 className="text-2xl font-bold text-blue-800 mb-2">
        {course.code} {course.name}
      </h1>

      <div className="lg:grid lg:grid-cols-2 lg:gap-4 mb-6">
        <div className='space-y-4 mb-4'>
          <p>
            <strong className="text-gray-700">คณะ:</strong><span className="text-blue-500"> {course.faculty}</span>
          </p>
          <p>
            <strong className="text-gray-700">รูปแบบรายวิชา:</strong><span className="text-blue-500"> {course.type}</span>
          </p>
          <p>
            <strong className="text-gray-700">สอบกลางภาค:</strong> <span className="text-blue-500">{course.midtermExam} </span>
          </p>
          <p>
            <strong className="text-gray-700">สอบปลายภาค:</strong><span className="text-blue-500"> {course.finalExam}</span>
          </p>
        </div>
        <div className='space-y-4'>
          <p>
            <strong className="text-gray-700">ภาควิชา/กลุ่มวิชา/สาขาวิชา:</strong><span className="text-blue-500"> {course.department}</span>
          </p>
          <p>
            <strong className="text-gray-700">หน่วยกิต:</strong><span className="text-blue-500"> {course.credits}</span>
          </p>
          <p>
            <strong className="text-gray-700">วิธีการวัดผล:</strong><span className="text-blue-500"> {course.gradingMethod}</span>
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาไทย)</h3>
        <p className="text-gray-600-mb4 "><span className="text-gray-500">{course.descriptionTH}</span></p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาอังกฤษ)</h3>
        <p className="text-gray-600">{course.descriptionEN}</p>
      </div>
    </div>
  );
};

export default CourseDetail;
