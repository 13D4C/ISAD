import React, { useState } from "react";

interface Subject {
    code: string;
    subject: string;
    credits: number;
    section: string;
    day: string;
    startTime?: string;
    duration: number;
    room: string;
    location: string;
    hasConflict?: boolean;
}

interface SubjectDetailBoxProps {
    subject: Subject;
    onDelete: (code: string) => void;
    onToggleVisibility: (code: string) => void;
    hasConflict?: boolean;
}

const SubjectDetailBox: React.FC<SubjectDetailBoxProps> = ({ subject, onDelete, onToggleVisibility, hasConflict  }) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
    onToggleVisibility(subject.code); // Trigger the hide/show logic in parent
  };

  const borderClass = hasConflict ? 'border-red-500' : 'border-gray-200';

  const calculateEndTime = (startTime: string | undefined, duration: number): string => {
    if (!startTime) return "N/A";
    const [hours, minutes] = startTime.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return "N/A";
    
    const endTimeDate = new Date(0, 0, 0, hours, minutes + duration * 60);
    return endTimeDate.getHours().toString().padStart(2, "0") + ":" + 
           endTimeDate.getMinutes().toString().padStart(2, "0");
  };

  return (
    <div className={`flex items-center border rounded-lg p-4 mb-4 bg-white shadow-md ${borderClass}`}>
      {/* Left side - Toggle visibility */}
      <div
        className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg mr-4 cursor-pointer"
        onClick={toggleVisibility}
      >
        {/* Use the provided SVG for eye and eye-slash */}
        {isHidden ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>

      {/* Middle section - Subject details */}
      <div className={`flex-1 ${isHidden ? "line-through opacity-50" : ""}`}>
        {/* Subject title and credit */}
        <h3 className="text-lg font-semibold text-gray-900">
          {subject.code} {subject.subject}
          <span className="text-sm text-gray-500 ml-2">
            [ {subject.credits} หน่วยกิต ]
          </span>
        </h3>

        {/* Class information */}
        <div className="text-gray-600 mt-1">
          <div className="flex space-x-4">
            <span>กลุ่มเรียน: {subject.section}</span>
            <span>
            เวลา: {subject.day} {subject.startTime || "N/A"} - {calculateEndTime(subject.startTime, subject.duration)}
            </span>
          </div> 
          <div className="flex space-x-4 mt-1">
            <span>ห้องเรียน: {subject.room}</span>
            <span>ตึก: {subject.location}</span>
          </div>
        </div>
      </div>

      {/* Right side - Buttons */}
      <div className="flex items-center space-x-2">
        {/* Timetable color button */}
        <button
          className="flex items-center px-4 py-1 rounded-full border bg-white text-black hover:bg-gray-50 transition-all"
        >
          {/* Circle with fixed color next to "สีในตาราง" */}
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: "#48A4FF" }} // Fixed blue color #48A4FF
          ></span>
          สีในตาราง
        </button>

        {/* Delete button */}
        <button
          className="text-gray-400 hover:text-red-600 transition-all"
          onClick={() => onDelete(subject.code)} // Trigger delete logic
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SubjectDetailBox;