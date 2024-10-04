"use client";
import React, { useState, useEffect } from "react";
import SubjectBox from "../components/SubjectBox";
import SubjectForm from "../components/SubjectForm";
import SelectSubjects from "../components/SelectSubject";
import { Section, SubjectData } from '../components/interface';
import axios, { AxiosError } from "axios";

// Define the type for select page state


const SelectPage: React.FC = () => {
  const [isFilterMenuVisible, setFilterMenuVisible] = useState<boolean>(true);
  const [selectSubjects, setSelectSubjects] = useState<number[]>([]);
  const [boxSubject, setBoxSubject] = useState<SubjectData[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isSelectSubjectsVisible, setSelectSubjectsVisible] = useState<boolean>(false);
  const [isSMScreen, setIsSMScreen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // Function to add a subject
  const fetchSubjectsFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/fetchSubject'); 
      const subjectsFromDB = response.data as SubjectData[];
      const subjectsWithSections = await Promise.all(subjectsFromDB.map(async (subject) => {
        const sections = await fetchSections(subject.subject_id); 
        return { ...subject, sections }; 
      }));
      setBoxSubject(subjectsWithSections);
    } catch (error) {
      console.error("Error fetching subjects from the database:", error);
    }
  };
  
  const fetchSections =  async (subject_id : String) => { 
    try {
      const response = await axios.get(`http://localhost:8888/api/fetchSections/${subject_id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching sections for subject_id ${subject_id}:`, error);
      return []; // ในกรณีที่เกิด error, ส่งค่าเป็น array ว่างกลับ
    }

  }

  const addSubject = (subjectData: SubjectData) => {
    setBoxSubject((prevBoxSubject) => {
      const updatedBox = [...prevBoxSubject, subjectData];
      localStorage.setItem("BoxSubject", JSON.stringify(updatedBox));
      return updatedBox;
    });
  };
  const updateScreenSize = () => {
    setIsSMScreen(window.innerWidth <= 640); // Set threshold for small screen (640px)
  };

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
  const deleteSubject = async (index: number) => {
    const subjectId = boxSubject[index].subject_id;
    try {
      console.log(subjectId);
      console.log(index);
      await axios.delete(`http://localhost:8888/api/subjects/${subjectId}`);

      setBoxSubject((prevBoxSubject) => {
        const updatedBoxSubject = prevBoxSubject.filter((_, i) => i !== index);
        localStorage.setItem("BoxSubject", JSON.stringify(updatedBoxSubject));
        return updatedBoxSubject;
      });
    } catch (e) {
      console.log(e);
    }
    
  };

  // Function to toggle subject selection
  const toggleSubjectSelection = (index: number) => {
    setSelectSubjects((prevSelectSubjects) => {
      if (prevSelectSubjects.includes(index)) {
        return prevSelectSubjects.filter((i) => i !== index);
      } else {
        return [...prevSelectSubjects, index];
      }
    });
  };

  // Load subjects from local storage
  useEffect(() => {
    const savedBoxSubject = JSON.parse(localStorage.getItem("BoxSubject") || '[]') as SubjectData[];
    setBoxSubject(savedBoxSubject);
    roleChecker();
    fetchSubjectsFromDatabase();
    updateScreenSize(); 
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);

  }, []);

  // Toggle filter menu visibility
  const toggleFilterMenu = () => {
    setFilterMenuVisible(!isFilterMenuVisible);
  };

  // Handle add box subject
  const handleAddBoxSubject = () => {
    setModalVisible(true);
  };

  // Handle form submission
  const handleSubmit = (subjectData: SubjectData) => {
    addSubject(subjectData);
    setModalVisible(false);
  };

  // Toggle select subjects visibility
  const handleToggleSelectSubjects = () => {
    setSelectSubjectsVisible(!isSelectSubjectsVisible);
  };

  // Remove selected subject
  const removeSelectedSubject = (index: number) => {
    setSelectSubjects((prevSelectSubjects) =>
      prevSelectSubjects.filter((i) => i !== index)
    );
  };

  return (
    <div>
    <div className="mx-36 pb-10">
      <h1 className="text-4xl py-5">ค้นหาวิชาเรียน</h1>
      <div className="flex flex-row gap-4">

        {/* Search */}
        <div className="rounded border shadow-md p-2 px-4 grow">
          <label className="text-sm" htmlFor="search"></label>
          <input className="w-full outline-none text-black" type="search" id="search" placeholder="ค้นหารหัสวิชา / ชื่อวิชา" />
        </div>

        {/* Filter Button */}
        <button className="rounded border shadow-md px-3" onClick={toggleFilterMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z"></path>
          </svg>
        </button>

        {/* Selected Subjects Button */}
        <button className="rounded border shadow-md px-4 pt-2 gap-2 flex" onClick={handleToggleSelectSubjects}>
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
                  {isAdmin && ( 
                  <button onClick={handleAddBoxSubject} className="rounded border shadow-md w-full p-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9ca3af" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>)}
                </div>

                {isModalVisible && (
                  <div className="fixed -inset-10 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-8 rounded shadow-md w-4/12">
                      <h2 className="text-xl mb-4 font-bold text-black">เพิ่มวิชาใหม่</h2>
                      <SubjectForm onSubmit={handleSubmit} onClose={() => setModalVisible(false)} />
                    </div>
                  </div>
                )}

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
          {isFilterMenuVisible && (
            <div className="rounded-md border border-gray-300 w-1/5 h-max">
              <div className="m-4 p-4 space-y-4">
                <h1 className="text-black">วันที่เรียน</h1>
                {["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"].map((day) => (
                  <div key={day}>
                    <input type="checkbox" id={day} />
                    <label className="text-black" htmlFor={day}> วัน{day}</label>
                  </div>
                ))}
              </div>
              <div className="m-4 p-4 pt-0 space-y-3">
                <h1 className="text-gray-500/50">Section</h1>
                {[1, 2, 3].map((sec) => (
                  <div key={sec}>
                    <input type="checkbox" id={`sec${sec}`} />
                    <label className="text-black" htmlFor={`sec${sec}`}> sec {sec}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show Selected Subjects */}
      <SelectSubjects
        isVisible={isSelectSubjectsVisible}
        onClose={handleToggleSelectSubjects}
        selectSubjects={selectSubjects}
        boxSubject={boxSubject}
        removeSelectedSubject={removeSelectedSubject}
      />
    </div>
    </div>
  );
}

export default SelectPage;
