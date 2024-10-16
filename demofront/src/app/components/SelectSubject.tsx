'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Subject, SubjectData, Schedule } from '../components/interface';
import { createSchedule, getSchedule, updateSchedule } from '../components/scheduleAPI';
import { getCurrentUserId } from './auth';



interface SelectSubjectsProps {
  isVisible: boolean;
  onClose: () => void;
  selectSubjects: { index: number; sectionIndex: number }[];
  boxSubject: SubjectData[];
  removeSelectedSubject: (index: number) => void;
}

function transformSubjectDataToSubject(subjectData: SubjectData, sectionIndex: number): SubjectData {
  const section = subjectData.sections[sectionIndex];
  const schedules = section.schedule.map((scheduleItem) => {
    const { day, time, room } = scheduleItem;
    const { startTime, duration } = parseTime(time);
    return {
      day,
      time,
      startTime,
      duration,
      room,
    };
  });

  return {
    ...subjectData,
    code: subjectData.subject_id,
    credits: subjectData.credit,
    schedules,
    hasConflict: false,
    hidden: false,
    selectedSectionIndex: sectionIndex
  };
}


function parseTime(timeString: string): { startTime: string, duration: number } {
  const [startTime, endTime] = timeString.trim().split(" - ");

  if (!startTime || !endTime) {
    console.error('Invalid time format:', timeString);
    return { startTime: '', duration: 0 };
  }

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  return {
    startTime,
    duration: durationHours,
  };
}

const SelectSubjects: React.FC<SelectSubjectsProps> = ({
  isVisible,
  onClose,
  selectSubjects,
  boxSubject,
  removeSelectedSubject,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!isVisible) return null;


  // const handleScheduleCreation = () => {
  //   const selectedSubjectData = selectSubjects.map(index => {
  //     const subjectData = boxSubject[index];
  //     return transformSubjectDataToSubject(subjectData, 0);
  //   });
  //   const queryString = encodeURIComponent(JSON.stringify(selectedSubjectData));
  //   router.push(`/timetable?selectedSubjects=${queryString}`);
  // };

  // const handleScheduleCreation = () => {
  //   const selectedSubjectData = selectSubjects.map(index => {
  //     const subjectData = boxSubject[index];
  //     return transformSubjectDataToSubject(subjectData, 0);
  //   });
  //   localStorage.setItem('selectedSubjectsData', JSON.stringify(selectedSubjectData));
  //   console.log(selectedSubjectData);
  //   router.push(`/timetable`);
  // };

  const handleScheduleCreation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      const selectedSubjectData = selectSubjects.map(({ index, sectionIndex }) => {
        const subject = boxSubject[index];
        return {
          ...subject,
          selectedSectionIndex: sectionIndex
        };
      });

      const existingSchedule = await getSchedule(userId);
      if (existingSchedule) {
        await updateSchedule(userId, selectedSubjectData);
      } else {
        await createSchedule(userId, selectedSubjectData);
      }

      router.push('/timetable');
    } catch (error) {
      console.error('Error creating/updating schedule:', error);
      setError('Failed to create or update schedule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
 

  const renderSelectSubjects = () => {
    return selectSubjects.map(({ index, sectionIndex }) => {
      const subject = boxSubject[index];
      const section = subject.sections[sectionIndex];
      return (
        <div key={index} className="flex justify-between p-2 border-b">
          <div className="flex">
            <p>
              {subject.subject_id} {subject.name} (Section {section.section})
            </p>
            <p className="text-gray-400">
              {"[ "}
              {getTotalCredits()} หน่วยกิต{" ]"}
            </p>
          </div>
          <button
            onClick={() => removeSelectedSubject(index)}
            className="text-red-500 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#dc2626"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      );
    });
  };

  const getTotalCredits = () => {
    return selectSubjects.reduce((total, { index }) => {
      const subject = boxSubject[index];
      return total + Number(subject.credit);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-2 rounded shadow-md lg:w-1/3 w-80">
        <div className="p-6 pb-0 flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">วิชาที่เลือก</h2>
          <button
            onClick={onClose}
            className="text-blue-900 hover:text-blue-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="h-72 mt-8 mb-4 overflow-y-scroll pl-4 pr-4">
          {selectSubjects.length === 0 ? (
            <div className="pb-10 h-full">
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-400">ไม่มีวิชาใดที่เลือก</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">{renderSelectSubjects()}</div>
          )}
        </div>

        <div className="p-6 xl:pt-20">
          <p className="p-2 font-medium text-blue-900">
            รวม {getTotalCredits()} หน่วยกิต
          </p>
          <button className="shadow-md w-full flex gap-2 justify-center items-center bg-blue-900 hover:bg-blue-950 rounded p-2 text-white" onClick={handleScheduleCreation} disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <p>{isLoading ? 'กำลังดำเนินการ...' : 'จัดตารางเรียน'}</p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSubjects;