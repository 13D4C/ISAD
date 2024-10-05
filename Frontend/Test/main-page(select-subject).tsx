'use client';
import React, { useState, useEffect } from 'react';

function SelectPage() {

  const [isFilterMenuVisible, setFilterMenuVisible] = useState(true); // สร้าง state สำหรับควบคุมการแสดงผล
  const [selectSubjects, setSelectSubjects] = useState([]);
  const [BoxSubject, setBoxSubject] = useState([]);

  // สำหรับเปลี่ยนแปลงสถานะของ filter menu
  const toggleFilterMenu = () => {
    setFilterMenuVisible(!isFilterMenuVisible);
  };

  // สำหรับเพิ่มกล่องใหม่
  const AddBoxSubject = () => {
    setBoxSubject(prevBoxSubject => {
      const updatBoxSubject = [...prevBoxSubject, {}];
      localStorage.setItem('BoxSubject', JSON.stringify(updatBoxSubject)); // บันทึกข้อมูลลง localStorage
      return updatBoxSubject;
    });
  };

  // สำหรับลบกล่อง
  const DeleteBoxSubject = (index) => {
    setBoxSubject(prevBoxSubject => {
      const updatBoxSubject = prevBoxSubject.filter((_, i) => i !== index);
      localStorage.setItem('BoxSubject', JSON.stringify(updatBoxSubject)); // บันทึกข้อมูลลง localStorage
      return updatBoxSubject;
    });
  };

  // โหลดข้อมูลจาก localStorage เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const savedBoxSubject = JSON.parse(localStorage.getItem('BoxSubject')) || [];
    setBoxSubject(savedBoxSubject);
  }, []);

  const toggleSubjectSelection = (index) => {
    setSelectSubjects((prevSelectSubjects) => {
      if (prevSelectSubjects.includes(index)) {
        // ถ้าวิชานี้ถูกเลือกอยู่ ให้ยกเลิกการเลือก
        return prevSelectSubjects.filter((i) => i !== index);
      } else {
        // ถ้าวิชานี้ยังไม่ถูกเลือก ให้เพิ่มเข้าไปใน selectSubjects
        return [...prevSelectSubjects, index];
      }
    });
  };

  return (

    <div className='mx-36 pb-10'> {/* margin */}

      <h1 className='text-4xl py-5'>ค้นหาวิชาเรียน</h1>
      
      <div className='flex flex-row gap-4'>
        
        {/* Search */}
        <div className='rounded border shadow-md p-2 px-4 grow'>
          <label className='text-sm' htmlFor='search'></label>
          <input className='w-full outline-none' type='search' id='=search' placeholder='ค้นหารหัสวิชา / ชื่อวิชา' />
        </div>

        {/* Filter Button */}
        <button className='rounded border shadow-md px-3' onClick={toggleFilterMenu}>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z'></path>
          </svg>
        </button>

        {/* Select Subject */}
        <button className='rounded border shadow-md px-4 pt-2 gap-2 flex'>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <path d='M3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7v2H5a2 2 0 0 0-2 2zm16 14H5V8h14z'></path>
          </svg>
          <span className='absolute flex -my-4 mx-24'>
            <div className='flex rounded-full px-2 py-0.5 bg-orange-400'>
              <p className='text-white text-xs'>{selectSubjects.length}</p>
            </div>
          </span>
          <h1>วิชาที่เลือก</h1>
          
          
        </button>
        
      </div>

      <div className='flex pt-5 space-x-4'>

        <div className='w-full'>
          {/* Add Subject */}
          <div className='space-y-4 '>
            <div className='justify-items-center'>
              <button onClick={AddBoxSubject} className='rounded border shadow-md w-full p-4 flex justify-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='#9ca3af' className='size-6'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>

              </button>
            </div>

            {/* แสดงกล่อง */}
            <div className='space-y-4'>
              {BoxSubject.map((box, index) => (
                <div key={index} className='rounded border shadow-md p-6'>
                  <div className='flex space-x-2'>
                    <p className='font-sans text-xl font-bold'>06066304 INFORMATION SYSTEM ANALYSIS AND DESIGN</p>
                    <p className='font-sans text-lg font-bold text-gray-500/50'>[ {index + 1} หน่วยกิต ]</p>

                    {/* Delete Button */}
                    <button onClick={() => DeleteBoxSubject(index)}
                      className='ml-4 '>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#dc2626' className='size-5'>
                        <path fill-rule='evenodd' d='M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z' clip-rule='evenodd' />
                      </svg>

                    </button>
                  </div>

                  <br />
                  <br />

                  <div className='flex space-x-10'>

                    <div className='space-y-2'>
                      <p className='text-sm text-gray-500/50'>วันที่เรียน</p>
                      <div className='flex space-x-2'>
                        {/* แสดงวันที่เรียนของวิชานั้นๆ */}
                        <p className='text-sm text-yellow-500 bg-yellow-100 rounded-full max-w-fit px-3 py-1'>วันจันทร์</p>
                        <p className='text-sm text-pink-500 bg-rose-100 rounded-full max-w-fit px-3 py-1'>วันอังคาร</p>
                        <p className='text-sm text-lime-700 bg-lime-200 rounded-full max-w-fit px-3 py-1'>วันพุธ</p>
                        <p className='text-sm text-orange-500 bg-amber-100 rounded-full max-w-fit px-3 py-1'>วันพฤหัสบดี</p>
                        <p className='text-sm text-cyan-500 bg-cyan-100 rounded-full max-w-fit px-3 py-1'>วันศุกร์</p>
                        </div>
                    </div>
                    
                    <div className='space-y-2'>
                      <p className='text-sm text-gray-500/50'>ห้องเรียน</p>
                      {/* แสดงห้องเรียนของวิชานั้นๆ */}
                      <p className='text-base'>M22</p>
                    </div>

                    <div className='space-y-2'>
                      <p className='text-sm text-gray-500/50'>ผู้สอน</p>
                      {/* แสดงผู้สอนของวิชานั้นๆ */}
                      <p className='text-base'>ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล</p>
                      <p className='text-base'>ผศ.ดร. พัฒนพงษ์ ฉันทมิตรโอภาส</p>
                    </div>

                  </div>
                  
                  {/* ปุ่มเลือกวิชา */}
                  <div className='relative'>
                    <button
                      onClick={() => toggleSubjectSelection(index)}
                      className={`rounded border gap-2 w-20 h-10 flex justify-center items-center absolute bottom-0 right-0 ${
                        selectSubjects.includes(index)
                          ? 'bg-white hover:bg-gray-100 text-blue-900 border-blue-900'
                          : 'bg-blue-900 hover:bg-blue-950 text-white'
                      }`}>
                      {selectSubjects.includes(index) ? (
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' className='size-4 text-current'>
                          <path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7' />
                        </svg>
                      ) : (
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' className='size-4 text-current'>
                          <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                      )}
                      <p className='text-sm'>เลือก</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Menu */}
        {isFilterMenuVisible && (
          <div className='rounded-md border border-gray-300 w-1/5 h-max'>
            <div className='m-4 p-4 space-y-4'>
              <h1 className='text-gray-500/50'>วันที่เรียน</h1>
              {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((day, index) => (
                <div key={index}>
                  <input type='checkbox' id={day} />
                  <label htmlFor={day}> วัน{day}</label>
                </div>
              ))}
            </div>
            <div className='m-4 p-4 pt-0 space-y-3'>
              <h1 className='text-gray-500/50'>Section</h1>
              {[1, 2, 3].map((sec) => (
                <div key={sec}>
                  <input type='checkbox' id={`sec${sec}`} />
                  <label htmlFor={`sec${sec}`}> sec {sec}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default SelectPage;
