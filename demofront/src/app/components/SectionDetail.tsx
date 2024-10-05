// components/SectionDetail.tsx
import React from 'react';

type SectionDetailProps = {
  group: string;
  section: string;
  instructors: string[];
  schedule: { day: string; time: string; room: string; type: string }[];
};

const SectionDetail: React.FC<SectionDetailProps> = ({ group, section, instructors, schedule }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-800">Group: {group}</h2>
        
      </div>

      <div className="mb-4 p-4 border rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-purple-700">Sec {section}</h3>
          
        </div>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
            <th className="px-4 py-2 text-left text-black">ผู้สอน</th>
            <th className="px-4 py-2 text-left text-black">วันเวลาเรียน</th>
            <th className="px-4 py-2 text-left text-black">ห้องเรียน</th>
            <th className="px-4 py-2 text-left text-black">รูปแบบ</th>

            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={index} className="border-t">
              <td className="px-4 py-2 text-blue-500">{instructor}</td>
              <td className="px-4 py-2 text-blue-500">
                {schedule[index].day} {schedule[index].time}
              </td>
              <td className="px-4 py-2 text-blue-500">{schedule[index].room}</td>
              <td className="px-4 py-2 text-blue-500">{schedule[index].type}</td>
            </tr>
            
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
       
      </div>
    </div>
  );
};

export default SectionDetail;
