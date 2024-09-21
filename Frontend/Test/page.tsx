"use client";
import React, { useRef } from "react";
import SubjectBox from "./SubjectBox";
import { toPng } from "html-to-image";
import SubjectDetailBox from "./SubjectDetailBox"; // Import the SubjectDetailBox

const ScheduleTable = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const hours = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","18:00",];

  // ข้อมูล subjects (แต่ละวิชาที่มีหน่วยกิต)
  const subjects = [
    {
      subject: "CHARM SCHOOL",
      day: "WED",
      startTime: "09:00",
      duration: 3,
      room: "M23",
      section: "903",
      code: "90642999",
      location: "IT",
    },
  ];

  // ฟังก์ชันคำนวณหน่วยกิตรวม
  const totalCredits = subjects.reduce((total, subject) => total + subject.duration, 0);

  const tableRef = useRef(null);

  const exportToPng = () => {
    if (tableRef.current === null) {
      return;
    }

    toPng(tableRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "table.png";
        link.click();
      })
      .catch((err) => {
        console.error("Failed to export table", err);
      });
  };

  const getSubjectAt = (day, hour) => {
    return subjects.find(
      (subject) => subject.day === day && subject.startTime === hour
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 mt-5 px-4 md:px-6 lg:px-8 xl:px-0 relative">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full md:w-auto">
        {/* Flex container to align title and buttons on opposite sides */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-3xl font-medium text-black dark:text-white mb-4 md:mb-0">
            จัดตารางเรียน
          </h2>

          {/* Buttons aligned to the right */}
          <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
            <button className="bg-white text-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางเรียน
            </button>
            <button className="bg-white text-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางสอบ
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto max-h-[400px] sm:max-h-[500px] border border-gray-200 rounded-lg shadow-lg dark:border-none relative">
          <table
            className="min-w-[1200px] table-fixed border-collapse bg-white dark:bg-gray-200 text-xs sm:text-sm md:text-base"
            ref={tableRef}
          >
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  Time Table
                </th>
                {hours.map((hour) => (
                  <th
                    key={hour}
                    className="border-b border-r border-gray-300 text-center font-semibold dark:border-black text-black"
                    style={{ width: "100px", height: "40px" }}
                  >
                    {hour}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td
                    className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 font-semibold text-black text-center dark:border-black"
                    style={{ width: "100px", height: "40px" }}
                  >
                    {day}
                  </td>
                  {hours.map((hour, hourIndex) => {
                    const subject = getSubjectAt(day, hour);
                    if (subject) {
                      return (
                        <SubjectBox
                          key={`${day}-${hour}`}
                          subject={subject.subject}
                          day={subject.day}
                          startTime={subject.startTime}
                          duration={subject.duration}
                          room={subject.room}
                          section={subject.section}
                          code={subject.code}
                          location={subject.location}
                          onClick={() => showCard(subject.code)}
                        />
                      );
                    }
                    return (
                      <td
                        key={`${day}-${hour}`}
                        className="border-b border-r p-2 sm:p-4 md:p-6 border-gray-200 dark:border-black hover:bg-indigo-100 transition-all"
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom section with export button and subject detail boxes */}
        <div className="mt-8 flex justify-between items-center w-full">
          {/* Export PNG button aligned to the left */}
          <button
            className="bg-blue-700 text-white border border-blue-700 py-2 px-4 sm:px-6 rounded-lg shadow-md text-xs sm:text-sm md:text-base hover:bg-blue-600 transition-all"
            onClick={exportToPng}
            type="button"
          >
            Export PNG
          </button>

          {/* Display total credits aligned to the right */}
          <div className="text-gray-600 dark:text-gray-300">
            หน่วยกิตรวมทั้งหมด: {totalCredits} หน่วยกิต
          </div>
        </div>

        {/* Subject detail boxes */}
        <div className="mt-4">
          {subjects.map((subject) => (
            <SubjectDetailBox key={subject.code} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
