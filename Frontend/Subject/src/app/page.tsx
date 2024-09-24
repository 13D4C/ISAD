"use client";
import React, { useState, useEffect } from "react";
import SubjectBox from "./component/SubjectBox";
import SubjectForm from "./component/SubjectForm";
import SelectSubjects from "./component/SelectSubject";

interface SubjectData {
  subjectID: string;
  subjectName: string;
  subjectCredit: number;
  studyDays: string[];
  description: string;
  sections: {
    section: string;
    time: string;
    professor: string;
    classroom: string;
  }[];
}

function SelectPage() {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState(true);
  const [selectSubjects, setSelectSubjects] = useState<number[]>([]);
  const [boxSubject, setBoxSubject] = useState<SubjectData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelectSubjectsVisible, setSelectSubjectsVisible] = useState(false);
  const [buttonText, setButtonText] = useState("วิชาที่เลือก");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSMScreen, setIsSMScreen] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);

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
    const savedBoxSubject = JSON.parse(
      localStorage.getItem("BoxSubject") || "[]"
    ) as SubjectData[];
    setBoxSubject(savedBoxSubject);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 550);
      setIsSMScreen(window.innerWidth < 700);
      setMediumScreen(window.innerWidth < 860);
    };

    const updateButtonText = () => {
      if (window.innerWidth < 550) {
        setButtonText("เลือก");
      } else {
        setButtonText("วิชาที่เลือก");
      }
    };

    handleResize();
    updateButtonText();

    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", updateButtonText);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", updateButtonText);
    };
  }, []);

  // ควบคุมการเปิด-ปิด FilterMenu
  const toggleFilterMenu = () => {
    setFilterMenuVisible(!isFilterMenuVisible);
  };

  // ควบคุมการมองเห็นของ Modal เวลากดเปิด-ปิด
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  // เก็บข้อมูลไว้หากกดปุ่ม submit
  const handleSubmit = (subjectData: SubjectData) => {
    addSubject(subjectData);
    setModalVisible(false);
  };

  // ฟังก์ชันเปิด-ปิด Modal Select Subject
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
    <div className="py-10 mx-10 lg:mx-20 sm:mx-10">
      {!isSmallScreen && (
        <h1 className="lg:text-4xl pb-5 text-3xl">ค้นหาวิชาเรียน</h1>
      )}
      {/* ปุ่มกดดูวิชาที่เลือกจอน้อยกว่า 550 */}
      {isSmallScreen && (
        <div className="flex flex-row gap-4 pb-5 justify-between">
          <h1 className="text-2xl">ค้นหาวิชาเรียน</h1>
          <div>
            <button
              className="rounded border shadow-md px-4 py-2 gap-2 flex"
              onClick={handleToggleSelectSubjects}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 0 0-2 2zm16 14H5V8h14z"></path>
              </svg>
              <span
                className={`absolute flex -my-4 ${
                  isSmallScreen ? "mx-16" : "mx-24"
                }`}
              >
                <div className="flex rounded-full px-2 py-0.5 bg-orange-400">
                  <p className="text-white text-xs">{selectSubjects.length}</p>
                </div>
              </span>
              <h1>{buttonText}</h1>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-4">
        {/* Search */}
        <div className="rounded border shadow-md p-2 px-4 grow">
          <label className="text-sm" htmlFor="search"></label>
          <input
            className="w-full outline-none"
            type="search"
            id="search"
            placeholder="ค้นหารหัสวิชา / ชื่อวิชา"
          />
        </div>

        {/* ปุ่ม Fliter */}
        <button
          className="rounded border shadow-md px-3"
          onClick={toggleFilterMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
          </svg>
        </button>

        {/* ปุ่มกดดูวิชาที่เลือก จอมากกว่า 550 */}
        {!isSmallScreen && (
          <button
            className="rounded border shadow-md px-4 pt-2 gap-2 flex"
            onClick={handleToggleSelectSubjects}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 0 0-2 2zm16 14H5V8h14z"></path>
            </svg>
            <span
              className={`absolute flex -my-4 ${
                isSmallScreen ? "mx-16" : "mx-24"
              }`}
            >
              <div className="flex rounded-full px-2 py-0.5 bg-orange-400">
                <p className="text-white text-xs">{selectSubjects.length}</p>
              </div>
            </span>
            <h1>{buttonText}</h1>
          </button>
        )}
      </div>

      <div className="pt-5">
        <div className="flex space-x-4">
          <div className="w-full">
            <div className="space-y-4">
              <div className="justify-items-center">
                <button
                  onClick={handleModalOpen}
                  className="rounded border shadow-md w-full p-4 flex justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#9ca3af"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>

              {/* Subject Form */}
              {isModalVisible && (
                <div className="fixed -inset-10 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="bg-white p-8 rounded shadow-md lg:w-4/12 w-80">
                    <h2 className="text-xl mb-4 font-bold">เพิ่มวิชาใหม่</h2>
                    <SubjectForm
                      onSubmit={handleSubmit}
                      onClose={() => setModalVisible(false)}
                    />
                  </div>
                </div>
              )}

              {/* แสดงกล่อง */}
              <SubjectBox
                BoxSubject={boxSubject}
                DeleteSubject={deleteSubject}
                toggleSubjectSelection={toggleSubjectSelection}
                selectSubjects={selectSubjects}
                isSMScreen={isSMScreen}
              />
            </div>
          </div>

          {/* Filter Menu */}
          {isFilterMenuVisible &&
            (isMediumScreen ? (
              <div className="fixed -inset-10 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Filter</p>
                    <button onClick={toggleFilterMenu}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="pl-5 grid grid-cols-2">
                    <div className="m-4 space-y-4">
                      <h1 className="text-gray-500/50">วันที่เรียน</h1>
                      {[
                        "จันทร์",
                        "อังคาร",
                        "พุธ",
                        "พฤหัสบดี",
                        "ศุกร์",
                        "เสาร์",
                        "อาทิตย์",
                      ].map((day) => (
                        <div key={day}>
                          <input type="checkbox" id={day} />
                          <label htmlFor={day}> {day}</label>
                        </div>
                      ))}
                    </div>

                    <div className="m-4 space-y-4">
                      <h1 className="text-gray-500/50">Section</h1>
                      {[1, 2, 3].map((sec) => (
                        <div key={sec}>
                          <input type="checkbox" id={`sec${sec}`} />
                          <label htmlFor={`sec${sec}`}> sec {sec}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="p-2 border border-blue-900 text-blue-900 rounded w-full">
                    เลือกตัวกรอง
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-gray-300 w-60 h-max">
                <div className="m-4 p-4 space-y-4">
                  <h1 className="text-gray-500/50">วันที่เรียน</h1>
                  {[
                    "จันทร์",
                    "อังคาร",
                    "พุธ",
                    "พฤหัสบดี",
                    "ศุกร์",
                    "เสาร์",
                    "อาทิตย์",
                  ].map((day) => (
                    <div key={day}>
                      <input type="checkbox" id={day} />
                      <label htmlFor={day}> {day}</label>
                    </div>
                  ))}
                  <h1 className="text-gray-500/50">Section</h1>
                  {[1, 2, 3].map((sec) => (
                    <div key={sec}>
                      <input type="checkbox" id={`sec${sec}`} />
                      <label htmlFor={`sec${sec}`}> sec {sec}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
