
import { useRouter } from "next/navigation";
import React from "react";

// Define your interfaces
interface Section {
  section: string;
  time: string;
  professor: string;
}

interface SubjectData {
  subjectID: string;
  subjectName: string;
  subjectCredit: string;
  studyDays: string[];
  classroom: string;
  instructors: string;
  description: string;
  sections: Section[];
}

interface SelectSubjectsProps {
  isVisible: boolean;
  onClose: () => void;
  selectSubjects: number[];
  boxSubject: SubjectData[];
  removeSelectedSubject: (index: number) => void;
}

const SelectSubjects: React.FC<SelectSubjectsProps> = ({
  isVisible,
  onClose,
  selectSubjects,
  boxSubject,
  removeSelectedSubject,
}) => {
  const router = useRouter();
  
  if (!isVisible) return null;

  const renderSelectSubjects = () => {
    return selectSubjects.map((index) => {
      const subject = boxSubject[index];
      return (
        <div key={index} className="flex justify-between p-2 border-b">
          <div className="flex">
            <p>
              {subject.subjectID} {subject.subjectName}
            </p>
            <p className="text-gray-400">
              {"[ "}
              {subject.subjectCredit} หน่วยกิต{" ]"}
            </p>
          </div>
          <button
            onClick={() => removeSelectedSubject(index)}
            className="text-red-500 hover:text-red-700"
          >
            {/* SVG for remove button */}
          </button>
        </div>
      );
    });
  };

  const getTotalCredits = () => {
    return selectSubjects.reduce((total, index) => {
      const subject = boxSubject[index];
      return total + Number(subject.subjectCredit);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-2 rounded shadow-md w-1/3 max-w-lg h-4/5">
        {/* Header */}
        <div className="p-6 pb-0 flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">วิชาที่เลือก</h2>
          <button onClick={onClose} className="text-blue-900 hover:text-blue-950">
            {/* Close button SVG */}
          </button>
        </div>

        {/* Selected Subjects */}
        <div className="h-4/6 mt-8 mb-4 overflow-y-scroll pl-4 pr-4">
          {selectSubjects.length === 0 ? (
            <div className="pb-10 h-full flex justify-center items-center">
              <p className="text-gray-400">ไม่มีวิชาใดที่เลือก</p>
            </div>
          ) : (
            <div className="space-y-2">{renderSelectSubjects()}</div>
          )}
        </div>

        {/* Credits and Navigation */}
        <div className="p-6 pt-0">
          <p className="p-2 font-medium text-blue-900">
            รวม {getTotalCredits()} หน่วยกิต
          </p>
          <button
            onClick={() => {
              router.push('/timetable');
            }}
            className="shadow-md w-full flex gap-2 justify-center items-center bg-blue-900 hover:bg-blue-950 rounded p-2 text-white"
          >
            {/* SVG for timetable button */}
            <p>จัดตารางเรียน</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSubjects;
