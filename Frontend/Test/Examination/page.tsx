"use client";
import React, { useState, useRef } from 'react';
import ExamRow from './ExamRow'; // สมมติว่าคุณมี ExamRow เป็นคอมโพเนนต์ที่ใช้แสดงข้อมูลแต่ละแถว
import { toPng } from 'html-to-image';

const ExamSchedule: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'midterm' | 'final'>('midterm');
  const tableRef = useRef(null);

  const handleTabClick = (tab: 'midterm' | 'final') => {
    setSelectedTab(tab);
  };

  const examData = [
    {
      id: 1,
      subjectCode: '90642999',
      subjectName: 'CHARM SCHOOL',
      examDate: 'TBA',
      examRoom: 'LAB 203',
    },
  ];

  const exportToPng = () => {
    if (tableRef.current === null) {
      return;
    }

    toPng(tableRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'exam-schedule.png';
        link.click();
      })
      .catch((err) => {
        console.error('Failed to export table', err);
      });
  };

  return (
    <div className="flex items-center justify-center dark:bg-gray-900 mt-20 px-4 md:px-6 lg:px-8 xl:px-0 relative">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full md:w-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-3xl font-medium text-black dark:text-white mb-4 md:mb-0">
            ตารางสอบ
          </h2>

          <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
            <button className="bg-white text-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางเรียน
            </button>
            <button className="bg-white text-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางสอบ
            </button>
          </div>
        </div>

        {/* ปุ่มอยู่ใต้โครงสร้าง */}
        <div className="flex justify-center mb-8">
          <button
            className={`py-2 px-4 sm:px-6 rounded-lg border border-gray-300 shadow-md transition-all ${
              selectedTab === 'midterm' ? 'bg-blue-700 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'
            }`}
            onClick={() => handleTabClick('midterm')}
          >
            กลางภาค
          </button>
          <button
            className={`ml-4 py-2 px-4 sm:px-6 rounded-lg border border-gray-300 shadow-md transition-all ${
              selectedTab === 'final' ? 'bg-blue-700 text-white' : 'bg-white text-black hover:bg-blue-700 hover:text-white'
            }`}
            onClick={() => handleTabClick('final')}
          >
            ปลายภาค
          </button>
        </div>

        <div className="overflow-x-auto max-h-[400px] sm:max-h-[500px] border border-gray-200 rounded-lg shadow-lg dark:border-none relative">
          <table
            className="min-w-[1200px] table-fixed border-collapse bg-white dark:bg-gray-200 text-xs sm:text-sm md:text-base"
            ref={tableRef}
          >
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  ลำดับที่
                </th>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  รหัสวิชา
                </th>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  ชื่อย่อรายวิชา
                </th>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  วันสอบ
                </th>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  ห้องสอบ
                </th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam) => (
                <ExamRow
                  key={exam.id}
                  id={exam.id}
                  subjectCode={exam.subjectCode}
                  subjectName={exam.subjectName}
                  examDate={exam.examDate}
                  examRoom={exam.examRoom}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-between items-center w-full">
          <button
            className="bg-blue-700 text-white border border-blue-700 py-2 px-4 sm:px-6 rounded-lg shadow-md text-xs sm:text-sm md:text-base hover:bg-blue-600 transition-all"
            onClick={exportToPng}
            type="button"
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
