// components/SectionDetail.tsx
import React from 'react';

type Section = {
  group: string;
  section: string;
  instructors: string[];
  schedule: { day: string; time: string; room: string; type: string }[];
};

const SectionDetail: React.FC<{ section: Section }> = ({ section }) => {
  // ตรวจสอบให้แน่ใจว่า instructors เป็นอาร์เรย์
  const instructors = section.instructors || []; // กำหนดให้เป็นอาร์เรย์ว่างถ้า undefined

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-100">
      <h3 className="text-lg font-bold text-blue-800">Group: {section.group}</h3>
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
          {instructors.map((instructor, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{instructor}</td>
              <td className="px-4 py-2">
                {section.schedule[idx]?.day} {section.schedule[idx]?.time}
              </td>
              <td className="px-4 py-2">{section.schedule[idx]?.room}</td>
              <td className="px-4 py-2">{section.schedule[idx]?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionDetail;
