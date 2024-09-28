// components/SectionDetail.tsx
import React from "react";

type SectionDetailProps = {
  group: string;
  section: string;
  instructors: string[];
  schedule: { day: string; time: string; room: string; type: string }[];
};

const SectionDetail: React.FC<SectionDetailProps> = ({
  group,
  section,
  instructors,
  schedule,
}) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Group: {group}</h2>

      <div className="mb-4 p-4 border rounded-md">
        <h3 className="text-lg font-bold text-purple-700 mb-4">
          Sec {section}
        </h3>

        <div className="flex">
          {instructors.map((instructor, index) => (
            <div key={index} className="lg:flex lg:space-x-10 flex flex-wrap justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-500/50">ผู้สอน</p>
                <p className="px-4 py-2 text-blue-500">{instructor}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500/50">วันเวลาเรียน</p>
                <p className="px-4 py-2 text-blue-500">
                  {schedule[index].day} {schedule[index].time}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500/50">ห้องเรียน</p>
                <p className="px-4 py-2 text-blue-500">
                  {schedule[index].room}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500/50">รูปแบบ</p>
                <p className="px-4 py-2 text-blue-500">
                  {schedule[index].type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
