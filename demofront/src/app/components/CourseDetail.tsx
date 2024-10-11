"use client";
import React, { useEffect, useState } from 'react';
import { Section, SubjectData } from '../components/interface';
import DecisionBox from './DecisionComponent';
import axios, { AxiosError } from 'axios';



const CourseDetail: React.FC<{ course: SubjectData }> = ({ course }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableCourse, setEditableCourse] = useState<SubjectData>({
    ...course,
    midterm: new Date(course.midterm), 
    final: new Date(course.final)
  });  
  const [originalCourse, setOriginalCourse] = useState<SubjectData>({
    ...course,
    midterm: new Date(course.midterm),
    final: new Date(course.final)
  });
  const [isDelSecBoxVisible, setDelSecBoxVisible] = useState(false);
  const [isDelClassBoxVisible, setDelClassBoxVisible] = useState(false);
  const [delSecIndex, setDelSecIndex] = useState<number| null>(null);
  const [delClassIndex, setDelClassIndex] = useState<{ sectionIndex: number; scheduleIndex: number } | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  const roleChecker = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.get('http://localhost:8888/api/rolechecker', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error checking role:", axiosError.response?.data || axiosError.message);
    }
  }

  useEffect(() => {
    roleChecker();
  }, []);

  // กดเพื่อเริ่มแก้ไข
  const handleEditClick = (course : SubjectData) => {
    setOriginalCourse(course); 
    setIsEditing(true);     
  };

  // กดยกเลิกการแก้ไข
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableCourse(originalCourse); // รีเซ็ตกลับไปที่ข้อมูลเดิม
  };

  // กดบันทึกการแก้ไข
  const handleSaveClick = async () => {
    if (editableCourse.sections && editableCourse.sections.length > 0) {
      const hasEmptySections = editableCourse.sections.some(section => !section.section || section.section < 0);

      if (hasEmptySections) {
        alert('กรุณากรอกหมายเลข Section'); 
        return; // ไม่ทำการบันทึก
    }};
    try {
      const professors = editableCourse.sections.map(sec => sec.professor).filter(Boolean);
      const updatedSubject = {
        style: editableCourse.style,
        credit: editableCourse.credit,
        professors,
        midterm: editableCourse.midterm,
        final: editableCourse.final,
        midtermTime: editableCourse.midtermTime,
        finalTime: editableCourse.finalTime,
        major: editableCourse.major,
        detail: editableCourse.detail,
      };

      await axios.put(`http://localhost:8888/api/subjects/${editableCourse.subject_id}`, updatedSubject);

      const sectionsToAdd = editableCourse.sections.filter(section => {
        const exists = originalCourse.sections.some(existingSection => existingSection.section === section.section);
        console.log("Exists for section", section.section, exists);
        return ((section.section || 0) && !exists);
      });

      for (const section of sectionsToAdd) {
        const newSection = {
          subject_id: editableCourse.subject_id,
          section: section.section,
          professor: section.professor,
          schedule: section.schedule,
          style: section.style,
        };
        console.log("New section:", newSection);

        await axios.post(`http://localhost:8888/api/addSection/${editableCourse.subject_id}`, newSection);
        console.log("Section added successfully:", newSection);
      }

      const updatedSections = editableCourse.sections.map(section => ({
        section: section.section,
        professor: section.professor,
        schedule: section.schedule,
        style: section.style,
      }));
      
      console.log(updatedSections);
      if (updatedSections.length > 0) {
        await axios.put(`http://localhost:8888/api/sections/${editableCourse.subject_id}`, updatedSections);
        console.log("Sections updated:", updatedSections);
      } else {
        console.warn("No sections to update.");
      }


      setIsEditing(false);
      return window.location.reload();
    } catch (error) {
      console.error('Error updating subject or sections:', error);
    }
  };

  // ฟังก์ชันที่ใช้จัดการการเปลี่ยนแปลงของฟิลด์ข้อมูลหลักๆ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'midtermExam' || name === 'finalExam') {
      const dateValue = new Date(value); // ถ้า value เป็น string ว่างให้เป็น null
      setEditableCourse((prev) => ({
        ...prev,
        [name]: dateValue,
      }));
    } else {
      setEditableCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

 const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    field: keyof Section
  ) => {
    const updatedSections = [...editableCourse.sections];
   if (field === 'section') {
     updatedSections[sectionIndex] = {
       ...updatedSections[sectionIndex],
       [field]: Number(e.target.value), 
     };
   } else {
     // สำหรับฟิลด์อื่นๆ ที่รับค่าเป็น string
     updatedSections[sectionIndex] = {
       ...updatedSections[sectionIndex],
       [field]: e.target.value, 
     };
   }
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  const handleScheduleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    scheduleIndex: number,
    field: keyof Section['schedule'][number],
    selectedDay?: string 
  ) => {
    const updatedSections = [...editableCourse.sections];
    const scheduleItem = updatedSections[sectionIndex].schedule[scheduleIndex];

    if (field === 'day' && selectedDay) {
      scheduleItem.day = selectedDay;
    } else {
      scheduleItem[field] = e.target.value;
    }
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  const handleAddClass = (sectionIndex: number) => {
    const newSchedule: Section['schedule'][number] = {
      day: '',
      time: '',
      room: '',
    }
    const updatedSections = [...editableCourse.sections];
    updatedSections[sectionIndex].schedule.push(newSchedule);

    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };
  const handleDeleteClass = (sectionIndex: number, scheduleIndex: number) => {
    const updatedSections = [...editableCourse.sections];
    console.log('Deleting section at index:', scheduleIndex);
    updatedSections[sectionIndex].schedule.splice(scheduleIndex, 1);
    setEditableCourse({ ...editableCourse, sections: updatedSections });
  };

  const handleAddSection = async () => {
    const newSection: Section = {
      subject_id: editableCourse.subject_id,
      section: null,
      professor: '',
      schedule: [],
      style: '',
    };
    setEditableCourse({
      ...editableCourse,
      sections: [...editableCourse.sections, newSection]
    })
  };

  // ฟังก์ชันสำหรับลบ Section
  const handleDeleteSection = async(sectionIndex: number) => {
     try {
      const response = await axios.delete(`http://localhost:8888/api/deleteSection/${editableCourse.subject_id}`, {
        data: [sectionIndex] 
      });

      const updatedSections = editableCourse.sections.filter((_, idx) => idx !== sectionIndex);
      setEditableCourse({ ...editableCourse, sections: updatedSections });

      console.log("Section deleted successfully", response.data);
      return window.location.reload();

    } catch (error) {
      console.log(editableCourse.sections)
      console.error("Failed to delete section:", error);
    } 
  };


  return (
    <div className="w-full max-w-7xl h-full p-6 bg-white rounded shadow-lg">
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
                <strong className="text-gray-700">คณะ:</strong>
                <span className="text-blue-500">เทคโนโลยีสารสนเทศ</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">รูปแบบรายวิชา:</strong>
                <span className="text-blue-500"> {editableCourse.style}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบกลางภาค:</strong>
                <span className="text-blue-500">{editableCourse.midterm ? new Date(editableCourse.midterm).toLocaleDateString() : 'N/A'}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">สอบปลายภาค:</strong>
                <span className="text-blue-500">{editableCourse.final ? new Date(editableCourse.final).toLocaleDateString() : 'N/A'}</span>
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
              <p className="mb-2">
                <strong className="text-gray-700">เวลาในการสอบกลางภาค:</strong>
                <span className="text-blue-500">{editableCourse.midtermTime}</span>
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">เวลาในการสอบปลายภาค:</strong>
                <span className="text-blue-500">{editableCourse.finalTime}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">คำอธิบายรายวิชา (ภาษาไทย)</h3>
            <p className="text-gray-600">{editableCourse.detail}</p>
          </div>

          <div className="space-y-2">
            {editableCourse.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative mb-4 p-4 border rounded-md bg-gray-100">
                <h4 className="text-md font-bold text-purple-700">Sec {section.section}</h4>
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
                    {section.schedule.map((scheduleItem, index) => (
                      <tr className="border-t" key={index}>
                        <td className="px-4 py-2">{section.professor}</td>
                        <td className="px-4 py-2">
                          {scheduleItem.day} {scheduleItem.time}
                        </td>
                        <td className="px-4 py-2">{scheduleItem.room}</td>
                        <td className="px-4 py-2">{section.style}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {isAdmin && <button
            className="text-sm mt-4 text-white bg-yellow-500 hover:bg-yellow-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
            onClick={() => handleEditClick(course)}
          >
            Edit
          </button>}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            แก้ไขข้อมูลรายวิชา {editableCourse.subject_id} {editableCourse.name}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">รูปแบบรายวิชา</label>
              <input
                type="text"
                name="style"
                value={editableCourse.style}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm font-medium text-gray-700">สอบกลางภาค</label>
                <input
                  type="date"
                  name="midterm"
                  value={editableCourse.midterm ? new Date(editableCourse.midterm).toISOString().substring(0, 10) : ''}                  
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">สอบปลายภาค</label>
                <input
                  type="date"
                  name="final"
                  value={editableCourse.final ? new Date(editableCourse.final).toISOString().substring(0, 10) : ''}                  
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">หน่วยกิต</label>
              <input
                type="text"
                name="credit"
                value={editableCourse.credit}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm  font-medium text-gray-700">เวลาในการสอบกลางภาค</label>
              <input
                type="text"
                name="midtermTime"
                value={editableCourse.midtermTime}     
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <label className="block text-sm mt-1 font-medium text-gray-700">เวลาในการสอบปลายภาค</label>
              <input
                type="text"
                name="finalTime"
                value={editableCourse.finalTime}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">ภาควิชา</label>
            <input
              type="text"
              name="major"
              value={editableCourse.major?.toString()}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <label className="block text-sm font-medium mt-1 text-gray-700">คำอธิบายรายวิชา</label>
            <textarea
              name="detail"
              value={editableCourse.detail}
              onChange={handleChange}
              className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

          {/* ฟอร์มแก้ไข Sections */}
            {editableCourse.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="relative pt-8 mb-4 p-4 border rounded-md bg-gray-100">
                {/* ปุ่ม Delete จะหายไปถ้าไม่อยู่ในโหมดแก้ไข */}
                {isEditing && (
                  <>
                  <button
                    className="absolute top-3 right-4 text-md bg-red-600 transition duration-300 ease-in-out hover:bg-red-700 text-white py-1 px-3 rounded"
                    onClick={() => {
                      setDelSecIndex(sectionIndex); 
                      setDelSecBoxVisible(true);
                    }}
                  >
                    Delete Section
                  </button>
                  {isDelSecBoxVisible && delSecIndex !== null && (
                  <DecisionBox
                    message_1="คุณแน่ใจที่จะลบ Section นี้ใช่หรือไม่?"
                    message_2="(Section นี้จะหายไปและไม่สามารถกู้คืนได้)"
                    onClose={(action) => {
                      if (action === 'delete') {
                        handleDeleteSection(delSecIndex);
                      }
                      setDelSecBoxVisible(false);
                      setDelSecIndex(null);
                    }}
                  />
                )}
                  </>
                )}


                <label className="block text-sm font-medium text-gray-700">Section</label>
                <input
                  type="text" 
                  required
                  value={section.section ?? ''} 
                  onChange={(e) => handleSectionChange(e, sectionIndex, 'section')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <input
                  type="text"
                  value={section.professor.trim()}
                  onChange={(e) => handleSectionChange(e, sectionIndex, 'professor')}
                  className="mt-1 block w-full px-3 py-2 border mb-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {section.schedule.map((scheduleItem, scheduleIndex) => (
                  <div key={scheduleIndex} className="relative p-4 border rounded-md bg-gray-100 mb-4">
                    {isEditing && (
                      <>
                      <button
                        className="absolute top-3 right-4 text-sm bg-red-600 transition duration-300 ease-in-out hover:bg-red-700 text-white py-1 px-3 rounded"
                        onClick={() => {
                          setDelClassBoxVisible(true); 
                          setDelClassIndex({sectionIndex, scheduleIndex});}}
                      >
                        Delete Class
                      </button>
                        {isDelClassBoxVisible && delClassIndex !== null && (
                          <DecisionBox
                            message_1="คุณแน่ใจที่จะลบ Class นี้ใช่หรือไม่?"
                            message_2="(Class นี้จะหายไปและไม่สามารถกู้คืนได้)"
                            onClose={(action) => {
                              if (action === 'delete') {
                                handleDeleteClass(delClassIndex.sectionIndex, delClassIndex.scheduleIndex); 
                              }
                              setDelClassBoxVisible(false);
                              setDelClassIndex(null);
                            }}
                          />
                        )}
                      </>
                    )}
                    
                    <div className="mt-1 block">
                      <label className="block text-sm font-medium text-gray-700 mt-2">Day</label>
                      {["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"].map((day) => (
                        <label key={day} className="inline-flex items-center text-gray-700 mr-4 ml-1 mt-1 mb-1">
                          <input
                            type="radio"
                            name={`day-${sectionIndex}-${scheduleIndex}`} // กำหนด name เดียวกันให้ทุกวันในกลุ่มนี้
                            checked={scheduleItem.day === day} // ตรวจสอบว่าถ้าวันนี้ถูกเลือกหรือไม่
                            onChange={(e) => handleScheduleChange(e, sectionIndex, scheduleIndex, 'day', day)} // ส่ง day ที่เลือกไป
                            className="hidden peer"
                          />
                          <div className="w-3 h-3 border border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-white peer-checked:border-2 "></div>
                          <span className="ml-2">{day}</span>
                        </label>
                      ))}
                    </div>

                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="text"
                      value={scheduleItem.time}
                      onChange={(e) => handleScheduleChange(e, sectionIndex, scheduleIndex, 'time')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <label className="block text-sm font-medium text-gray-700">Room</label>
                    <input
                      type="text"
                      value={scheduleItem.room}
                      onChange={(e) => handleScheduleChange(e, sectionIndex, scheduleIndex, 'room')}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                ))}
                

                <label className="block text-sm font-medium text-gray-700">Style</label>
                <input
                  type="text"
                  value={section.style}
                  onChange={(e) => handleSectionChange(e, sectionIndex, 'style')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button 
                className='text-sm mt-4 text-white bg-green-500 hover:bg-green-700 py-2 px-2 rounded mb-2 shadow-md transition duration-300 ease-in-out'
                onClick={() => handleAddClass(sectionIndex)}>
                  Add Class
                </button>
              </div>
            ))}

          {/* ปุ่มบันทึกและยกเลิก */}
            <button
              className="mr-4 text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="mr-4 text-sm text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded mb-4 shadow-md transition duration-300 ease-in-out"
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