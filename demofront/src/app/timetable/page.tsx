"use client";
import React, { useState, useRef, useEffect } from "react";
import SubjectBox from "./SubjectBox";
import { toPng } from "html-to-image";
import SubjectDetailBox from "./SubjectDetailBox";
import chroma from 'chroma-js';
import PopupComponent from "./PopupComponenet";
import { SubjectData, Schedule, Section } from '../components/interface';
import { getSchedule, updateSchedule } from '../components/scheduleAPI';
import { getCurrentUserId } from '../components/auth';
import axios from "axios";
import { useRouter } from "next/navigation";

const ScheduleTable: React.FC = () => {
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [sectionData, setSectionData] = useState<{ [key: string]: any }>({});
    const [popupSubject, setPopupSubject] = useState<SubjectData | null>(null);
    const [subjectColors, setSubjectColors] = useState<{[key: string]: string}>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const router = useRouter();
    

  const handleNavigate = () => {
    router.push(`/Examination`);
  };

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

  // useEffect(() => {
  //   const selectedSubjectsParam = searchParams.get('selectedSubjects');
  //   if (selectedSubjectsParam) {
  //     const selectedSubjects: Subject[] = JSON.parse(decodeURIComponent(selectedSubjectsParam));
  //     const subjectsWithConflicts = checkForConflicts(selectedSubjects);
  //     setSubjects(subjectsWithConflicts);
  //   }
  //   console.log(subjects);
  // }, [searchParams]);

  // useEffect(() => {
  //   const storedSubjects = localStorage.getItem('selectedSubjectsData');
  //   if (storedSubjects) {
  //     const parsedSubjects: SubjectData[] = JSON.parse(storedSubjects);
  //     const subjectsWithConflicts = checkForConflicts(parsedSubjects);
  //     console.log(subjectsWithConflicts)
  //     setSubjects(subjectsWithConflicts);
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserSchedule = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userId = getCurrentUserId();
        if (!userId) {
          throw new Error('User ID not found. Please log in again.');
        }
  
        const userSchedule = await getSchedule(userId);
        if (!userSchedule || !userSchedule.subjects || userSchedule.subjects.length === 0) {
          setError('No subjects found in your schedule. Please select subjects first.');
          setIsLoading(false);
          return;
        }
  
        const fetchedSubjects = userSchedule.subjects;
        const subjectsWithSections = await Promise.all(fetchedSubjects.map(async (subject) => {
          // Fetch full subject details
          const subjectResponse = await axios.get(`http://localhost:8888/api/fetchSubjectById/${subject.subject}`);
          const subjectData = subjectResponse.data;
  
          // Fetch sections for the subject
          const sectionsResponse = await axios.get(`http://localhost:8888/api/fetchSections/${subjectData.subject_id}`);
          const sections = sectionsResponse.data;
  
          return {
            ...subjectData,
            sections: sections,
            selectedSectionIndex: subject.selectedSectionIndex
          };
        }));
  
        const subjectsWithConflicts = checkForConflicts(subjectsWithSections);
        setSubjects(subjectsWithConflicts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user schedule:', error);
        setError('Failed to load your schedule. Please try again.');
        setIsLoading(false);
      }
    };
  
    fetchUserSchedule();
  }, []);

  const checkForConflicts = (subjects: SubjectData[]): SubjectData[] => {
    return subjects.map(subject => {
      let hasConflict = false;
      subject.schedules?.forEach(schedule => {
        const conflictingSubject = subjects.find(otherSubject => 
          otherSubject !== subject &&
          otherSubject.schedules?.some(otherSchedule => 
            schedule.day === otherSchedule.day &&
            checkTimeConflict(schedule, otherSchedule)
          )
        );
        if (conflictingSubject) {
          hasConflict = true;
        }
      });
      return { ...subject, hasConflict };
    });
  };

  const checkTimeConflict = (schedule1: Schedule, schedule2: Schedule): boolean => {
    const { startTime: startTime1, duration: duration1 } = parseTime(schedule1.time);
    const { startTime: startTime2, duration: duration2 } = parseTime(schedule2.time);
    const start1 = new Date(`1970-01-01T${startTime1}`).getTime();
    const end1 = start1 + duration1 * 60 * 60 * 1000;
    const start2 = new Date(`1970-01-01T${startTime2}`).getTime();
    const end2 = start2 + duration2 * 60 * 60 * 1000;

    return (start1 < end2 && end1 > start2) || (start2 < end1 && end2 > start1);
  };

  const parseTime = (timeString: string): { startTime: string, duration: number } => {
    const [startTime, endTime] = timeString.split(" - ");
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return { startTime, duration: durationHours };
  };


  // new feature
  const thaiToEnglishDay = (thaiDay: string) => {
    const dayMap: { [key: string]: string } = {
      'จันทร์': 'MON',
      'อังคาร': 'TUE',
      'พุธ': 'WED',
      'พฤหัสบดี': 'THU',
      'ศุกร์': 'FRI',
      'เสาร์': 'SAT',
      'อาทิตย์': 'SUN'
    };
    return dayMap[thaiDay] || 'Unknown';
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
    (total, subject) => total + (subject.hidden ? 0 : subject.credit),
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

  const getSubjectAt = (day: string, hour: string): SubjectData | undefined => {
    return subjects.find((subject) => {
      if (typeof subject.selectedSectionIndex !== 'number') {
        return false;
      }
      const selectedSection = subject.sections[subject.selectedSectionIndex];
      if (!selectedSection) {
        return false;
      }
      return selectedSection.schedule.some((schedule: Schedule) => 
        thaiToEnglishDay(schedule.day) === day && 
        schedule.time.startsWith(hour) && 
        !subject.hidden
      );
    });
  };


  const handleSectionChange = async (subjectId: string, sectionIndex: number) => {
    const updatedSubjects = subjects.map(subject => 
      subject.subject_id === subjectId 
        ? { ...subject, selectedSectionIndex: sectionIndex }
        : subject
    );
    setSubjects(updatedSubjects);
  
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      // Prepare the data in the format expected by the updateSchedule function
      const scheduleData = updatedSubjects.map(subject => ({
        subject: subject._id,
        selectedSectionIndex: subject.selectedSectionIndex
      }));
      await updateSchedule(userId, scheduleData);
    } catch (error) {
      console.error('Error updating schedule:', error);
      // Optionally, revert the change if the update fails
      setSubjects(subjects);
    }
  };

  const getSelectedSection = (subject: SubjectData): Section => {
    // Check if there's a selectedSectionIndex property on the subject
    if ('selectedSectionIndex' in subject && typeof subject.selectedSectionIndex === 'number') {
      // If the selectedSectionIndex is valid, return the selected section
      if (subject.selectedSectionIndex >= 0 && subject.selectedSectionIndex < subject.sections.length) {
        return subject.sections[subject.selectedSectionIndex];
      }
    }
  
    // If no valid selection is found, fall back to the first section
    return subject.sections[0];
  };

  const toggleVisibility = async (subjectCode: string) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.subject_id === subjectCode
        ? { ...subject, hidden: !subject.hidden }
        : subject
    );
    setSubjects(updatedSubjects);
  };

  const deleteSubject = async (subjectCode: string) => {
    const updatedSubjects = subjects.filter((subject) => subject.subject_id !== subjectCode);
    setSubjects(updatedSubjects);

    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      await updateSchedule(userId, updatedSubjects);
    } catch (error) {
      console.error('Error updating schedule:', error);
      // Optionally, revert the change if the update fails
      setSubjects(subjects);
    }
  };

  const handleSubjectClick = (subject: SubjectData) => {
    setPopupSubject(subject);
    console.log("subjectclick", subject);
  };

  const closePopup = () => {
    setPopupSubject(null);
  };

  const handleColorChange = (subjectCode: string, color: string) => {
    setSubjectColors(prevColors => ({
      ...prevColors,
      [subjectCode]: color
    }));
    closePopup();
  };

  if (isLoading) {
    return <div>Loading schedule...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <button onClick={() => handleNavigate()} className="bg-white text-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
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
                        const selectedSection = getSelectedSection(subject);
                        const schedule = selectedSection.schedule.find(s => 
                          thaiToEnglishDay(s.day) === day && parseTime(s.time).startTime === hour
                        );
                        
                        if (schedule) {
                          const duration = Math.min(
                            parseTime(schedule.time).duration,
                            columnsLeft
                          );

                          if (duration > 0) {
                            totalColumns += duration;
                            return (
                              <SubjectBox
                                key={`${day}-${hour}`}
                                subject={subject.name}
                                day={schedule.day}
                                startTime={schedule.time.split(' - ')[0]}
                                duration={duration}
                                room={schedule.room}
                                section={selectedSection.section.toString()}
                                code={subject.subject_id}
                                location="IT"
                                onClick={() => handleSubjectClick(subject)}
                                forceColor={subjectColors[subject.subject_id] || null}
                                hasConflict={subject.hasConflict}
                              />
                            );
                          }
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
      key={subject._id}
      subject={{
        ...subject,
        subject_id: subject.subject_id,
        name: subject.name,
        credit: subject.credit,
        sections: subject.sections,
        selectedSectionIndex: subject.selectedSectionIndex,
        hidden: subject.hidden || false,
        hasConflict: subject.hasConflict || false
      }}
      onToggleVisibility={toggleVisibility}
      onDelete={deleteSubject}
      onSectionChange={handleSectionChange}
    />
  ))}
        </div>
      </div>

      {/* Pop-up for subject details */}
      {popupSubject && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PopupComponent
            subjectId={popupSubject.subject_id}
            onClose={closePopup}
            onHide={() => toggleVisibility(popupSubject.subject_id)}
            onRemove={() => deleteSubject(popupSubject.subject_id)}
            onColorChange={(color) => handleColorChange(popupSubject.subject_id, color)}
          />
      </div>
    )}
    </div>
  );
};

export default ScheduleTable;