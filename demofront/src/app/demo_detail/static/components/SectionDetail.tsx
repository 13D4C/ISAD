// components/SectionDetail.tsx
import React from 'react';
import { Section } from '@/app/components/interface';

const SectionDetail: React.FC<{ section: Section }> = ({ section }) => {

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-100">
      <h4 className="text-md font-bold text-purple-700">Sec {section.section}</h4>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ผู้สอน</th>
            <th className="px-4 py-2 text-left">วันเวลาเรียน</th>
            <th className="px-4 py-2 text-left">ห้องเรียน</th>
            <th className="px-4 py-2 text-left">รูปแบบ</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2">{section.professor}</td>
            <td className="px-4 py-2">
              {/* Mapping through the day array, with a fallback if section.day is undefined */}
              {section.day && section.day.length > 0 ? (
                section.day.map((day, idx) => (
                  <p key={idx}>{day}</p>
                ))
              ) : (
                <p>No days available</p> // Fallback content if no days are available
              )}
            </td>
            <td className="px-4 py-2">{section.time}</td>
            <td className="px-4 py-2">{section.room}</td>
            <td className="px-4 py-2">{section.style}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SectionDetail;
