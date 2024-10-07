'use client'
import React from 'react';

const SubjectBox = ({ subject, day, startTime, duration, room, section, code, location, onClick, forceColor }) => {
  // Calculate the end time based on start time and duration
  const timeMap = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00'];
  const startTimeIndex = timeMap.indexOf(startTime);
  const endTime = timeMap[startTimeIndex + duration] || 'Unknown';

  return (
    <td
      className="border-b border-r p-2 border-gray-200 dark:border-black text-white text-center font-semibold rounded-lg shadow-lg"
      colSpan={duration}
      style={{ backgroundColor: forceColor }} // Apply dynamic background color based on subject code or forced color
      onClick={onClick}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top Row: Room/Location and Time */}
        <div className="flex justify-between text-xs">
          <span>{room} / {location}</span>
          <span>{startTime} - {endTime}</span>
        </div>

        {/* Middle Row: Course Code and Name */}
        <div className="text-sm">{code} {subject}</div>

        {/* Bottom Row: Section */}
        <div className="text-xs">{`Section ${section}`}</div>
      </div>
    </td>
  );
};

export default SubjectBox;