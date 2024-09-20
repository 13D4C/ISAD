"use client";
import React, { useState, useEffect } from "react";
import SubjectBox from "./componant/SubjectBox";
import SubjectForm from "./componant/SubjectForm";
import SelectSubjects from "./componant/SelectSubject";

interface SubjectData {
  subjectID: string;
  subjectName: string;
  subjectCredit: number;
  studyDays: string[];
  classroom: string;
  description: string;
  sections: { section: string; time: string; professor: string }[];
}

function SelectPage() {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(true);
  const [selectSubjects, setSelectSubjects] = useState<number[]>([]);
  const [boxSubject, setBoxSubject] = useState<SubjectData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelectSubjectsVisible, setSelectSubjectsVisible] = useState(false);

  // ฟังก์ชันเพิ่ม Box วิชา
  const addSubject = (subjectData: SubjectData) => {
    setBoxSubject((prevBoxSubject) => {
      const updatedBox = [...prevBoxSubject, subjectData];
      localStorage.setItem("BoxSubject", JSON.stringify(updatedBox));
      return updatedBox;
    });
  };

  // ฟังก์ชันลบ Box วิชา
  const deleteSubject = (index: number) => {
    setBoxSubject((prevBoxSubject) => {
      const updatedBoxSubject = prevBoxSubject.filter((_, i) => i !== index);
      localStorage.setItem("BoxSubject", JSON.stringify(updatedBoxSubject));
      return updatedBoxSubject;
    });
  };

  // ฟังก์ชันเลือกวิชา
  const toggleSubjectSelection = (index: number) => {
    setSelectSubjects((prevSelectSubjects) => {
      if (prevSelectSubjects.includes(index)) {
        return prevSelectSubjects.filter((i) => i !== index);
      } else {
        return [...prevSelectSubjects, index];
      }
    });
  };

  // โหลดวิชาที่เก็บไว้จาก localstorage 
  useEffect(() => {
    const savedBoxSubject = JSON.parse(localStorage.getItem("BoxSubject") || "[]");
    setBoxSubject(savedBoxSubject);
  }, []);

  // ควบคุมการเปิด-ปิด FilterMenu
  const toggleFilterMenu = () => {
    setFilterMenuVisible(!isFilterMenuVisible);
  };

  // ควบคุมการมองเห็นของ Box เวลากดเปิด-ปิด
  const handleAddBoxSubject = () => {
    setModalVisible(true);
  };

  // เก็บข้อมูลไว้หากกดปุ่ม submit
  const handleSubmit = (subjectData: SubjectData) => {
    addSubject(subjectData);
    setModalVisible(false);
  };

  // ฟังก์ชันเปิด-ปิด pop-up
  const handleToggleSelectSubjects = () => {
    setSelectSubjectsVisible(!isSelectSubjectsVisible);
  };

  // ฟังก์ชันลบวิชาจาก selectSubjects
  const removeSelectedSubject = (index: number) => {
    setSelectSubjects((prevSelectSubjects) => 
      prevSelectSubjects.filter((i) => i !== index)
    );
  };

  return (
    <div className="mx-36 pb-10">
      <h1 className="text-4xl py-5">ค้นหาวิชาเรียน</h1>
      <div className="flex flex-row gap-4">

        {/* Search */}
        <div className="rounded border shadow-md p-2 px-4 grow">
          <label className="text-sm" htmlFor="search"></label>
          <input className="w-full outline-none" type="search" id="search" placeholder="ค้นหารหัสวิชา / ชื่อวิชา" />
        </div>

        {/* ปุ่ม Fliter */}
        <button className="rounded border shadow-md px-3" onClick={toggleFilterMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
          </svg>
        </button>

        {/* ปุ่มกดดูวิชาที่เลือก */}
        <button className="rounded border shadow-md px-4 pt-2 gap-2 flex"
          onClick={handleToggleSelectSubjects}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 0 0-2 2zm16 14H5V8h14z"></path>
          </svg>
          <span className="absolute flex -my-4 mx-24">
            <div className="flex rounded-full px-2 py-0.5 bg-orange-400">
              <p className="text-white text-xs">{selectSubjects.length}</p>
            </div>
          </span>
          <h1>วิชาที่เลือก</h1>
        </button>
      </div>

      <div className="pt-5">
        <div className="flex space-x-4">
          <div className="w-full">
            <div className="space-y-4">
              <div className="justify-items-center">
                <button
                  onClick={handleAddBoxSubject}
                  className="rounded border shadow-md w-full p-4 flex justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9ca3af" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>

              {/* Subject Form */}
              {isModalVisible && (
                <div className="fixed -inset-10 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="bg-white p-8 rounded shadow-md w-4/12">
                    <h2 className="text-xl mb-4 font-bold">เพิ่มวิชาใหม่</h2>
                    <SubjectForm onSubmit={handleSubmit} onClose={() => setModalVisible(false)} />
                  </div>
                </div>
              )}

              {/* แสดงกล่อง */}
              <SubjectBox
                BoxSubject={boxSubject}
                DeleteSubject={deleteSubject}
                toggleSubjectSelection={toggleSubjectSelection}
                selectSubjects={selectSubjects}
              />
            </div>
          </div>

          {/* Filter Menu */}
          {isFilterMenuVisible && (
            <div className="rounded-md border border-gray-300 w-1/5 h-max">
              <div className="m-4 p-4 space-y-4">
                <h1 className="text-gray-500/50">วันที่เรียน</h1>
                {["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"].map((day) => (
                  <div key={day}>
                    <input type="checkbox" id={day} />
                    <label htmlFor={day}> วัน{day}</label>
                  </div>
                ))}
              </div>
              <div className="m-4 p-4 pt-0 space-y-3">
                <h1 className="text-gray-500/50">Section</h1>
                {[1, 2, 3].map((sec) => (
                  <div key={sec}>
                    <input type="checkbox" id={`sec${sec}`} />
                    <label htmlFor={`sec${sec}`}> sec {sec}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* แสดงวิชาที่เลือก */}
      <SelectSubjects
        isVisible={isSelectSubjectsVisible}
        onClose={handleToggleSelectSubjects}
        selectSubjects={selectSubjects}
        boxSubject={boxSubject}
        removeSelectedSubject={removeSelectedSubject}
      />
    </div>
  );
}

export default SelectPage;
