'use client'
import React from 'react';
import chroma from 'chroma-js';

// Predefined color palette from your image
const colorPalette = ['#48A4FF', '#4CAF50', '#8B00F8', '#F27537', '#FF609B', '#FFC107'];

interface SubjectBoxProps {
    subject: string;
    day: string;
    startTime: string;
    duration: number;
    room: string;
    section: string;
    code: string;
    location: string;
    onClick: () => void;
    forceColor?: string | null;
    hasConflict?: boolean;
}


// Function to map the subject code to a color or allow forcing a color
const getColorFromCode = (code: string, forceColor: string | null = null, hasConflict: boolean = false): string => {

    if (hasConflict) {
        return '#FF0000'; // Red color for conflicts
    }

    // If a forced color is provided and valid, use it
    if (forceColor && colorPalette.includes(forceColor)) {
        return forceColor;
    }

    // Hash the subject code to consistently assign a color from the palette
    const hash = Array.from(code).reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Map the hash to one of the colors in the predefined palette
    return chroma.scale(colorPalette).mode('lab')(hash % colorPalette.length / colorPalette.length).hex();
};

const SubjectBox: React.FC<SubjectBoxProps> = ({
    subject,
    day,
    startTime,
    duration,
    room,
    section,
    code,
    location,
    onClick,
    forceColor = null,
    hasConflict = false
}) => {
    // Calculate the end time based on start time and duration
    const timeMap = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00'];
    const startTimeIndex = timeMap.indexOf(startTime);
    const endTime = timeMap[startTimeIndex + duration] || 'Unknown';

    // Get the color, either by code or forced
    const bgColor = getColorFromCode(code, forceColor, hasConflict);

    return (
        <td
            className="border-b border-r p-2 border-gray-200 dark:border-black text-white text-center font-semibold rounded-lg shadow-lg"
            colSpan={duration}
            style={{ backgroundColor: bgColor }} // Apply dynamic background color based on subject code or forced color
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