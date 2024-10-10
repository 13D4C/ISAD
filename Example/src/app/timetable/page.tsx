"use client";
import React, { useState, useRef, useEffect } from "react";
import SubjectBox from "./SubjectBox";
import { toPng } from "html-to-image";
import SubjectDetailBox from "./SubjectDetailBox"; // Import the SubjectDetailBox
import chroma from 'chroma-js';
import PopupComponent from "./PopupComponent";

interface Subject {
  subject: string;
  day: string;
  startTime: string;
  duration: number;
  room: string;
  section: string;
  code: string;
  location: string;
  hidden: boolean;
  credits: number;
  hasConflict?: boolean;
}

const colorPalette = ['#FACC15', '#F472B6', '#4ADE80', 'FB923C', '#60A5FA', '#C084FC'];

const getColorFromCode = (code: any, forceColor = null) => {
  // If a forced color is provided and valid, use it
  if (forceColor && colorPalette.includes(forceColor)) {
    return forceColor;
  }
  // Hash the subject code to consistently assign a color from the palette
  const hash = [...code].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Map the hash to one of the colors in the predefined palette
  return chroma.scale(colorPalette).mode('lab')(hash % colorPalette.length / colorPalette.length).hex();
};

const ScheduleTable: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [popupSubject, setPopupSubject] = useState<Subject | null>(null);
  const [forceColor, setForceColor] = useState('');
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    // Load subjects from localStorage
    const storedSubjects = localStorage.getItem('selectedSubjectsData');
    if (storedSubjects) {
      const parsedSubjects: any[] = JSON.parse(storedSubjects);
  
      // Flatten the schedules array to match the Subject interface
      const subjectsWithFlattenedSchedules = parsedSubjects.map(subject => {
        const { schedules, ...rest } = subject;
        const schedule = schedules[0]; // Assuming you only care about the first schedule
        return {
          ...rest,
          day: schedule.day,
          startTime: schedule.startTime,
          duration: schedule.duration,
          room: schedule.room
        };
      });
  
      const subjectsWithConflicts = checkForConflicts(subjectsWithFlattenedSchedules);
      setSubjects(subjectsWithConflicts);
      console.log(subjectsWithConflicts);
    }
  }, []);
  
  

  const checkForConflicts = (subjects: Subject[]): Subject[] => {
    const conflictMap: { [key: string]: boolean } = {};
    
    subjects.forEach((subject, index) => {
      const subjectStart = new Date(`1970-01-01T${subject.startTime}`).getTime();
      const subjectEnd = subjectStart + subject.duration * 60 * 60 * 1000;

      subjects.forEach((otherSubject, otherIndex) => {
        if (index !== otherIndex && subject.day === otherSubject.day) {
          const otherStart = new Date(`1970-01-01T${otherSubject.startTime}`).getTime();
          const otherEnd = otherStart + otherSubject.duration * 60 * 60 * 1000;
  
          // Check for overlap
          if (
            (subjectStart < otherEnd && subjectEnd > otherStart) || // subject overlaps otherSubject
            (otherStart < subjectEnd && otherEnd > subjectStart)    // otherSubject overlaps subject
          ) {
            subjects[index].hasConflict = true;
            subjects[otherIndex].hasConflict = true;
          }
        }
      });
    });

    return subjects;
  };
  

  const thaiToEnglishDay = (thaiDay: string) => {
    switch (thaiDay) {
      case 'จันทร์':
        return 'MON';
      case 'อังคาร':
        return 'TUE';
      case 'พุธ':
        return 'WED';
      case 'พฤหัสบดี':
        return 'THU';
      case 'ศุกร์':
        return 'FRI';
      case 'เสาร์':
        return 'SAT';
      case 'อาทิตย์':
        return 'SUN';
      default:
        return 'Unknown';
    }
  };

  

  const days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const hours: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '18:00',
  ];

  const hourMap = hours.reduce<{ [key: string]: string }>((acc, hour, index, array) => {
    if (index < array.length - 1) {
      const nextHour = array[index + 1];
      acc[hour] = `${hour}-${nextHour}`;
    } else {
      acc[hour] = `${hour}-${parseInt(hour.slice(0, 2)) + 1}:00`;
    }
    return acc;
  }, {});

  const totalCredits = subjects.reduce(
    (total, subject) => total + (subject.hidden ? 0 : subject.credits),
    0
  );

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

  const getSubjectAt = (day: string, hour: string) => {
    return subjects.find(
      (subject) => thaiToEnglishDay(subject.day) === day && subject.startTime === hour && !subject.hidden
    );
  };

  const toggleVisibility = (subjectCode: string) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.code === subjectCode
          ? { ...subject, hidden: !subject.hidden }
          : subject
      )
    );

    localStorage.setItem('selectedSubjectsData', JSON.stringify(subjects));
  };

  // Function to delete a subject from the state
  const deleteSubject = (subjectCode: string) => {
    const updatedSubjects = subjects.filter((subject) => subject.code !== subjectCode);
    setSubjects(updatedSubjects);
    // Update localStorage
    localStorage.setItem('selectedSubjectsData', JSON.stringify(updatedSubjects));
  };

  // Function to handle the subject click and show a pop-up
  const handleSubjectClick = (subject: Subject) => {
    setPopupSubject(subject); // Set the subject for the pop-up
  };

  // Function to close the pop-up
  const closePopup = () => {
    setPopupSubject(null); // Clear the subject to hide the pop-up
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
                    style={{ width: '120px', height: '40px' }}
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

                    {hours.map((hour) => {
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
                              // Trigger pop-up on subject click
                              onClick={() => handleSubjectClick(subject)}
                              forceColor={forceColor}
                              hasConflict={subject.hasConflict}
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
        {subjects.map((subject, index) => (
          <SubjectDetailBox
            key={subject.code}
            subject={subject}
            onToggleVisibility={toggleVisibility}
            onDelete={deleteSubject}
            hasConflict={subject.hasConflict}
          />
        ))}
        </div>
      </div>

      {/* Pop-up for subject details */}
      {popupSubject && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <PopupComponent
          subjectId={popupSubject.code}
          onClose={closePopup}
          onHide={() => toggleVisibility(popupSubject.code)}
          onRemove={() => deleteSubject(popupSubject.code)}
          onColorChange={(color) => {
            setForceColor(color);
            closePopup();
      }}
    />
  </div>
)}
    </div>
  );
};

export default ScheduleTable;