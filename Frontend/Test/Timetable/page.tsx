"use client";
import React, { useState, useRef } from "react";
import SubjectBox from "./SubjectBox";
import { toPng } from "html-to-image";
import SubjectDetailBox from "./SubjectDetailBox"; // Import the SubjectDetailBox
import CharmSchoolComponent from "./PopupComponent";
import chroma from 'chroma-js';

// Predefined color palette from your image
const colorPalette = ['#48A4FF', '#FFB74D', '#4CAF50', '#F27537', '#FF609B', '#FFC107'];

// Function to map the subject code to a color or allow forcing a color
const getColorFromCode = (code, forceColor = null) => {
  if (forceColor && colorPalette.includes(forceColor)) {
    return forceColor;
  }

  const hash = [...code].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return chroma.scale(colorPalette).mode('lab')(hash % colorPalette.length / colorPalette.length).hex();
};

const ScheduleTable = () => {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "18:00",
  ];

  const hourMap = hours.reduce((acc, hour, index, array) => {
    if (index < array.length - 1) {
      const nextHour = array[index + 1];
      acc[hour] = `${hour}-${nextHour}`;
    } else {
      acc[hour] = `${hour}-${parseInt(hour.slice(0, 2)) + 1}:00`;
    }
    return acc;
  }, {});

  // Initialize subjects with a credits field and hidden state
  const [subjects, setSubjects] = useState([
    {
      subject: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      day: "TUE",
      startTime: "09:00",
      duration: 3,
      room: "M04",
      section: "903",
      code: "06066304",
      location: "IT",
      hidden: false,
      credits: 3,  // Adding credits field
      color: getColorFromCode("90642999")
    }
  ]);

  const [popupSubject, setPopupSubject] = useState(null); // State to manage the pop-up subject details

  // Calculate total credits based on the credits field
  const totalCredits = subjects.reduce(
    (total, subject) => total + (subject.hidden ? 0 : subject.credits),
    0
  );

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
      (subject) => subject.day === day && subject.startTime === hour && !subject.hidden
    );
  };

  const toggleVisibility = (subjectCode) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.code === subjectCode
          ? { ...subject, hidden: !subject.hidden }
          : subject
      )
    );
  };

  const deleteSubject = (subjectCode) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.code !== subjectCode)
    );
  };

  const handleSubjectClick = (subject) => {
    setPopupSubject(subject);
  };

  const closePopup = () => {
    setPopupSubject(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 mt-5 px-4 md:px-6 lg:px-8 xl:px-0 relative">
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full md:w-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-3xl font-medium text-black dark:text-white mb-4 md:mb-0">
            จัดตารางเรียน
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
                    style={{ width: "120px", height: "40px" }}
                  >
                    {hourMap[hour]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                let totalColumns = 1;

                return (
                  <tr key={day}>
                    <td
                      className="border-b border-r border-gray-300 p-2 sm:p-4 md:p-6 font-semibold text-black text-center dark:border-black"
                      style={{ width: "120px", height: "40px" }}
                    >
                      {day}
                    </td>

                    {hours.map((hour, hourIndex) => {
                      const subject = getSubjectAt(day, hour);

                      const columnsLeft = 11 - totalColumns;

                      if (subject) {
                        const duration = Math.min(
                          subject.duration,
                          columnsLeft
                        );

                        if (duration > 0) {
                          totalColumns += duration;
                          return (
                            <SubjectBox
                              key={`${day}-${hour}`}
                              subject={subject.subject}
                              day={subject.day}
                              startTime={subject.startTime}
                              duration={duration}
                              room={subject.room}
                              section={subject.section}
                              code={subject.code}
                              location={subject.location}
                              forceColor={subject.color}
                              onClick={() => handleSubjectClick(subject)}
                            />
                          );
                        }
                      }

                      if (totalColumns < 11) {
                        totalColumns++;
                        return (
                          <td
                            key={`${day}-${hour}`}
                            className="border-b border-r p-2 sm:p-4 md:p-6 border-gray-200 dark:border-black hover:bg-indigo-100 transition-all"
                          />
                        );
                      }

                      return null;
                    })}
                  </tr>
                );
              })}
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

          <div className="text-gray-600 dark:text-gray-300">
            หน่วยกิตรวมทั้งหมด: {totalCredits} หน่วยกิต
          </div>
        </div>

        <div className="mt-4">
          {subjects.map((subject) => (
            <SubjectDetailBox
              key={subject.code}
              subject={subject}
              onToggleVisibility={toggleVisibility}
              onDelete={deleteSubject}
              forceColor={subject.color}
            />
          ))}
        </div>
      </div>

      {popupSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CharmSchoolComponent />
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;