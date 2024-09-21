import React from "react";

// A component to display details for each subject
const SubjectDetailBox = ({ subject }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg mr-4">
        {/* Placeholder or icon */}
        <span role="img" aria-label="eye" className="text-2xl">
          👁️
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {subject.code} {subject.subject}
          <span className="text-sm text-gray-500 ml-2">
            [ {subject.duration} หน่วยกิต ]
          </span>
        </h3>
        <div className="text-gray-600 dark:text-gray-400">
          <span className="mr-4">กลุ่มเรียน: {subject.section}</span>
          <span className="mr-4">
            เวลา: {subject.day} {subject.startTime} -{" "}
            {(parseInt(subject.startTime) + subject.duration)
              .toString()
              .padStart(2, "0")}
            :00
          </span>
          <span className="mr-4">ห้องเรียน: {subject.room}</span>
          <span>ตึก: {subject.location}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300 transition-all">
          สีในตาราง
        </button>
        <button className="text-red-600 hover:text-red-800 transition-all">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default SubjectDetailBox;
