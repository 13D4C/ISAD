// components/CourseDetail.tsx
"use client";
import React, { useState } from 'react';
import SectionDetail from './SectionDetail';

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
  sections: Section[];
};

type Section = {
  group: string;
  section: string;
  instructors: string[];
  schedule: { day: string; time: string; room: string; type: string }[];
};

const CourseDetail: React.FC<{ course: Course }> = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableCourse, setEditableCourse] = useState(course);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableCourse(course); // Reset form to original values
  };

  const handleSaveClick = () => {
    // Logic to save the updated course details (e.g., API call)
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableCourse({ ...editableCourse, [name]: value });
  };

  return (
    <div className="w-full max-w-7xl h-full p-6 bg-white rounded shadow-lg">
      <button className="text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out">
        &larr; Back
      </button>

      {!isEditing ? (
        <>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            {course.code} {course.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">คณะ:</strong>
                <span className="text-blue-500"> {course.faculty}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">รูปแบบรายวิชา:</strong>
                <span className="text-blue-500"> {course.type}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบกลางภาค:</strong>
                <span className="text-blue-500">{course.midtermExam}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบปลายภาค:</strong>
                <span className="text-blue-500"> {course.finalExam}</span>
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">ภาควิชา:</strong>
                <span className="text-blue-500"> {course.department}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">หน่วยกิต:</strong>
                <span className="text-blue-500"> {course.credits}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">วิธีการวัดผล:</strong>
                <span className="text-blue-500"> {course.gradingMethod}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาไทย)</h3>
            <p className="text-gray-600">{course.descriptionTH}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาอังกฤษ)</h3>
            <p className="text-gray-600">{course.descriptionEN}</p>
          </div>

          <div className="space-y-8">
            {course.sections.map((section, index) => (
              <SectionDetail key={index} section={section} />
            ))}
          </div>

          <button
            className="text-sm text-white bg-yellow-500 hover:bg-yellow-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Edit Course</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-gray-700">คณะ:</label>
              <input
                className="w-full p-2 border rounded"
                name="faculty"
                value={editableCourse.faculty}
                onChange={handleChange}
              />
              <label className="text-gray-700">รูปแบบรายวิชา:</label>
              <input
                className="w-full p-2 border rounded"
                name="type"
                value={editableCourse.type}
                onChange={handleChange}
              />
              <label className="text-gray-700">สอบกลางภาค:</label>
              <input
                className="w-full p-2 border rounded"
                name="midtermExam"
                value={editableCourse.midtermExam}
                onChange={handleChange}
              />
              <label className="text-gray-700">สอบปลายภาค:</label>
              <input
                className="w-full p-2 border rounded"
                name="finalExam"
                value={editableCourse.finalExam}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-700">ภาควิชา:</label>
              <input
                className="w-full p-2 border rounded"
                name="department"
                value={editableCourse.department}
                onChange={handleChange}
              />
              <label className="text-gray-700">หน่วยกิต:</label>
              <input
                className="w-full p-2 border rounded"
                name="credits"
                value={editableCourse.credits}
                onChange={handleChange}
              />
              <label className="text-gray-700">วิธีการวัดผล:</label>
              <input
                className="w-full p-2 border rounded"
                name="gradingMethod"
                value={editableCourse.gradingMethod}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-gray-700">คำอธิบายรายวิชา (ภาษาไทย):</label>
            <textarea
              className="w-full p-2 border rounded"
              name="descriptionTH"
              value={editableCourse.descriptionTH}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700">คำอธิบายรายวิชา (ภาษาอังกฤษ):</label>
            <textarea
              className="w-full p-2 border rounded"
              name="descriptionEN"
              value={editableCourse.descriptionEN}
              onChange={handleChange}
            />
          </div>

          <button
            className="text-sm text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="text-sm text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
