"use client";
import React, { useState } from 'react';
import { SubjectData, Section } from '@/app/components/interface';

const CourseDetail: React.FC<{ course: SubjectData }> = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableCourse, setEditableCourse] = useState(course);
  console.log(editableCourse.sections[1].day)

  // กดเพื่อเริ่มแก้ไข
  const handleEditClick = () => setIsEditing(true);

  // กดยกเลิกการแก้ไข
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableCourse(course); // รีเซ็ตกลับไปที่ข้อมูลเดิม
  };

  // กดบันทึกการแก้ไข
  const handleSaveClick = () => {
    // เพิ่ม logic สำหรับการบันทึก เช่นการเรียก API
    setIsEditing(false);
  };

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงของฟิลด์ข้อมูลหลักๆ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableCourse({ ...editableCourse, [name]: value });
  };

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงของข้อมูล Sections
  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    field: keyof Section
  ) => {
    const updatedSections = [...editableCourse.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: e.target.value,
    };
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงของ Instructors ในแต่ละ Section
  const handleInstructorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    instructorIndex: number
  ) => {
    const updatedSections = [...editableCourse.sections];
    updatedSections[sectionIndex].instructors[instructorIndex] = e.target.value;
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงของ Schedule ในแต่ละ Section
  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    scheduleIndex: number,
    field: keyof Section['schedule'][0]
  ) => {
    const updatedSections = [...editableCourse.sections];
    updatedSections[sectionIndex].schedule[scheduleIndex] = {
      ...updatedSections[sectionIndex].schedule[scheduleIndex],
      [field]: e.target.value,
    };
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  // ฟังก์ชันสำหรับเพิ่ม Section ใหม่
  const handleAddSection = () => {
    const newSection: Section = {
      group: `Group ${editableCourse.sections.length + 1}`, // ชื่อ Group ใหม่
      section: '',
      instructors: [''],
      schedule: [{ day: '', time: '', room: '', type: '' }],
    };
    setEditableCourse({ ...editableCourse, sections: [...editableCourse.sections, newSection] });
  };

  // ฟังก์ชันสำหรับลบ Section
  const handleDeleteSection = (sectionIndex: number) => {
    const updatedSections = editableCourse.sections.filter((_, idx) => idx !== sectionIndex);
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  return (
    <div className="w-screen h-screen p-6 bg-white rounded shadow-lg overflow-y-auto">
      <button className="text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out">
        &larr; Back
      </button>

      {!isEditing ? (
        <>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            {editableCourse.subject_id} {editableCourse.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">รูปแบบรายวิชา:</strong>
                <span className="text-blue-500"> {editableCourse.style}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบกลางภาค:</strong>
                <span className="text-blue-500"> {editableCourse.midterm + ' ' + editableCourse.midtermTime}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบปลายภาค:</strong>
                <span className="text-blue-500"> {editableCourse.final + ' ' + editableCourse.midtermTime}</span>
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong className="text-gray-700">ภาควิชา:</strong>
                <span className="text-blue-500"> {editableCourse.major}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">หน่วยกิต:</strong>
                <span className="text-blue-500"> {editableCourse.credit}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาไทย)</h3>
            <p className="text-gray-600">{editableCourse.detail}</p>
          </div>

          <div className="space-y-8">
                {editableCourse.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="relative mb-4 p-4 border rounded-md bg-gray-100">
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteSection(sectionIndex)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    )}

                    <h4 className="text-md font-bold text-purple-700">Sec {section.section || 'N/A'}</h4>
                    <table className="table-auto w-full mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left">ผู้สอน</th>
                          <th className="px-4 py-2 text-left">วันเวลาเรียน</th>
                          <th className="px-4 py-2 text-left">ห้องเรียน</th>
                          <th className="px-4 py-2 text-left">รูปแบบ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={sectionIndex} className="border-t">
                          <td className="px-4 py-2">{section.professor || 'N/A'}</td>
                          <td className="px-4 py-2">
                            {section.day?.join(", ") || 'N/A'} {section.time || 'N/A'}
                          </td>
                          <td className="px-4 py-2">{section.room || 'N/A'}</td>
                          <td className="px-4 py-2">{section.style || 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            แก้ไขข้อมูลรายวิชา {editableCourse.subject_id} {editableCourse.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">รูปแบบรายวิชา</label>
              <input
                type="text"
                name="type"
                value={editableCourse.style}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">สอบกลางภาค</label>
              <input
                type="text"
                name="midtermExam"
                value={editableCourse.midterm + ' ' + editableCourse.midtermTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">สอบปลายภาค</label>
              <input
                type="text"
                name="finalExam"
                value={editableCourse.final + ' ' + editableCourse.finalTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ภาควิชา</label>
              <input
                type="text"
                name="department"
                value={editableCourse.major}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">หน่วยกิต</label>
              <input
                type="text"
                name="credits"
                value={editableCourse.credit}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">คำอธิบายรายวิชา</label>
              <textarea
                name="description"
                value={editableCourse.detail}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* ฟอร์มแก้ไข Sections */}
          {editableCourse.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="relative mb-4 p-4 border rounded-md bg-gray-100">
              {/* ปุ่ม Delete จะหายไปถ้าไม่อยู่ในโหมดแก้ไข */}
              {isEditing && (
                <button
                  onClick={() => handleDeleteSection(sectionIndex)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              )}

              <label className="block text-sm font-medium text-gray-700">Group</label>
              <input
                type="text"
                value={section.group}
                onChange={(e) => handleSectionChange(e, sectionIndex, 'group')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <input
                type="text"
                value={section.section}
                onChange={(e) => handleSectionChange(e, sectionIndex, 'section')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {/* รายการ Instructors */}
              {section.instructors.map((instructor, instructorIndex) => (
                <div key={instructorIndex}>
                  <label className="block text-sm font-medium text-gray-700">Instructor</label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => handleInstructorChange(e, sectionIndex, instructorIndex)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              ))}
              {/* รายการ Schedule */}
              {section.schedule.map((schedule, scheduleIndex) => (
                <div key={scheduleIndex}>
                  <label className="block text-sm font-medium text-gray-700">Schedule</label>
                  <input
                    type="text"
                    value={schedule.day}
                    onChange={(e) => handleScheduleChange(e, sectionIndex, scheduleIndex, 'day')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* ปุ่มบันทึกและยกเลิก */}
          <button
            className="text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
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

          {/* ปุ่ม Add Section แสดงเมื่ออยู่ในโหมดแก้ไข */}
          <button
            className="text-sm text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
            onClick={handleAddSection}
          >
            Add Section
          </button>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
