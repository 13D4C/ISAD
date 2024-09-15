import React, { useState } from "react";

const bgColor = {
  จันทร์: "bg-yellow-100",
  อังคาร: "bg-rose-100",
  พุธ: "bg-lime-200",
  พฤหัสบดี: "bg-amber-100",
  ศุกร์: "bg-cyan-100",
};

const textColor = {
  จันทร์: "text-yellow-500",
  อังคาร: "text-pink-500",
  พุธ: "text-lime-700",
  พฤหัสบดี: "text-orange-500",
  ศุกร์: "text-cyan-500",
};

const Subject = ({
  BoxSubject,
  DeleteSubject,
  toggleSubjectSelection,
  selectSubjects,
}) => {
  const [selectedSections, setSelectedSections] = useState({});

  const handleSectionChange = (index, event) => {
    setSelectedSections((prev) => ({
      ...prev,
      [index]: event.target.value,
    }));
  };

  return (
    <div className="space-y-4">
      {BoxSubject.map((box, index) => (
        <div key={index} className="rounded border shadow-md p-6">
          <div className="flex space-x-2">
            <p className="font-sans text-xl font-bold">
              {box.subjectID}
            </p>
            <button>
              {box.subjectName}
            </button>
            <p className="font-sans text-lg font-bold text-gray-500/50">
              [{box.subjectCredit} หน่วยกิต]
            </p>

            {/* Delete Button */}
            <button onClick={() => DeleteSubject(index)} className="ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#dc2626"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <br />
          <br />

          <div className="flex space-x-10">
            <div className="space-y-2">
              <p className="text-sm text-gray-500/50">วันที่เรียน</p>
              <div className="flex space-x-2">
                {/* แสดงวันที่เรียนของวิชานั้นๆ */}
                {box.studyDays.map((day, idx) => (
                  <p
                    key={idx}
                    className={`text-sm ${textColor[day] || "text-gray-500"} ${
                      bgColor[day] || "bg-gray-100"
                    } rounded-full max-w-fit px-3 py-1`}
                  >
                    วัน{day}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500/50">เวลา</p>
              <p className="text-base">
                {selectedSections[index] !== "" &&
                  box.sections.find(
                    (sec) => sec.section === selectedSections[index]
                  )?.time}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500/50">ห้องเรียน</p>
              <p className="text-base">{box.classroom}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500/50">ผู้สอน</p>
              <p className="text-base">
                {selectedSections[index] !== "" &&
                  box.sections.find(
                    (sec) => sec.section === selectedSections[index]
                  )?.professor}
              </p>
            </div>
          </div>

          <div className="relative">
            {/* ปุ่มเลือก sec */}
            <div className="absolute bottom-0 right-0 flex space-x-2">
              <select
                value={selectedSections[index] || ""}
                onChange={(e) => handleSectionChange(index, e)}
                className="shadow-md rounded border gap-2 w-20 h-10 flex justify-center items-center p-2 border-blue-900 text-sm"
              >
                {box.sections.map((sec, secIndex) => (
                  <option key={secIndex} value={sec.section}>
                    {sec.section}
                  </option>
                ))}
              </select>

              {/* ปุ่มเลือกวิชา */}
              <button
                onClick={() => toggleSubjectSelection(index)}
                className={`shadow-md rounded border gap-2 w-20 h-10 flex justify-center items-center ${
                  selectSubjects.includes(index)
                    ? "bg-white hover:bg-gray-100 text-blue-900 border-blue-900"
                    : "bg-blue-900 hover:bg-blue-950 text-white"
                }`}
              >
                {selectSubjects.includes(index) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-4 text-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-4 text-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
                <p className="text-sm">เลือก</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subject;
