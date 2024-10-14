import React, { useState, useEffect } from "react";
import { SubjectData, Schedule, Section } from '../components/interface';
import axios from 'axios';

interface SubjectDetailBoxProps {
    subject: SubjectData;
    onDelete: (code: string) => void;
    onToggleVisibility: (code: string) => void;
    onSectionChange: (subjectId: string, sectionIndex: number) => void;
}

const SubjectDetailBox: React.FC<SubjectDetailBoxProps> = ({ 
    subject, 
    onDelete, 
    onToggleVisibility, 
    onSectionChange 
}) => {
    const [isHidden, setIsHidden] = useState<boolean>(subject.hidden || false);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(subject.selectedSectionIndex || 0);
    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        if (!Array.isArray(subject.sections) || typeof subject.sections[0] === 'string') {
            // If sections are not detailed, fetch them
            fetchSections();
        } else {
            setSections(subject.sections as Section[]);
        }
    }, [subject]);

    const fetchSections = async () => {
        try {
            const response = await axios.get(`http://localhost:8888/api/fetchSections/${subject.subject_id}`);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
        onToggleVisibility(subject.subject_id);
    };

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newIndex = parseInt(event.target.value);
        setSelectedSectionIndex(newIndex);
        onSectionChange(subject.subject_id, newIndex);
    };

    const borderClass = subject.hasConflict ? 'border-red-500' : 'border-gray-200';

    const selectedSection = sections[selectedSectionIndex];

    return (
        <div className={`flex items-center border rounded-lg p-4 mb-4 bg-white shadow-md ${borderClass}`}>
            {/* Toggle visibility button */}
            <div
                className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg mr-4 cursor-pointer"
                onClick={toggleVisibility}
            >
                {isHidden ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                )}
            </div>

            {/* Subject details */}
            <div className={`flex-1 ${isHidden ? "line-through opacity-50" : ""}`}>
                <h3 className="text-lg font-semibold text-gray-900">
                    {subject.subject_id} {subject.name}
                    <span className="text-sm text-gray-500 ml-2">
                        [ {subject.credit} หน่วยกิต ]
                    </span>
                </h3>

                {/* Section selection */}
                <div className="mt-2">
                    <label htmlFor={`section-select-${subject.subject_id}`} className="text-sm font-medium text-gray-700">
                        Select Section:
                    </label>
                    <select
                        id={`section-select-${subject.subject_id}`}
                        value={selectedSectionIndex}
                        onChange={handleSectionChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {sections.map((section, index) => (
                            <option key={index} value={index}>
                                Section {section.section}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Class information */}
                <div className="text-gray-600 mt-1">
                    {selectedSection && (
                        <div className="mb-2">
                            <div className="font-semibold">กลุ่มเรียน: {selectedSection.section}</div>
                            {selectedSection.schedule && selectedSection.schedule.map((schedule, scheduleIndex) => (
                                <div key={scheduleIndex} className="ml-4">
                                    <span>วัน: {schedule.day} {schedule.time}</span>
                                    <span className="ml-2">ห้อง: {schedule.room}</span>
                                </div>
                            ))}
                            <div className="ml-4">
                                รูปแบบ: {selectedSection.style} &nbsp;&nbsp; 
                                อาจารย์: {selectedSection.professor}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
                <button className="flex items-center px-4 py-1 rounded-full border bg-white text-black hover:bg-gray-50 transition-all">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: "#48A4FF" }}></span>
                    สีในตาราง
                </button>

                <button
                    className="text-gray-400 hover:text-red-600 transition-all"
                    onClick={() => onDelete(subject.subject_id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SubjectDetailBox;