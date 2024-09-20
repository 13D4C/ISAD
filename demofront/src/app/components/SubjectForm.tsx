import React, { useState } from "react";

const SubjectForm = ({ onSubmit, onClose }) => {
  const [subjectID, setSubjectID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCredit, setSubjectCredit] = useState("");
  const [studyDays, setStudyDays] = useState([]);
  const [classroom, setClassroom] = useState("");
  const [instructors, setInstructors] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([{ section: "", time: "", professor: "" }]);
  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  const handleDaySelection = (day) => {
    setStudyDays((prevStudyDays) => {
      if (prevStudyDays.includes(day)) {
        return prevStudyDays.filter((d) => d !== day);
      } else {
        return [...prevStudyDays, day];
      }
    });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { section: "", time: "" }]);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subjectData = {
      subjectID,
      subjectName,
      subjectCredit,
      studyDays,
      classroom,
      instructors,
      description,
      sections
    };
    onSubmit(subjectData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2 overflow-y-scroll pr-4 h-96">
        {/* รหัสวิชา */}  
        <div className="mb-2">
          <label className="block text-sm text-black font-medium">รหัสวิชา</label>
          <input
            type="text"
            value={subjectID}
            onChange={(e) => setSubjectID(e.target.value)}
            placeholder="06xxxx"
            className="border rounded p-2 w-full text-sm text-black"
            required
          />
        </div>

        {/* ชื่อวิชา */}
        <div className="mb-2 col-span-2">
          <label className="block text-sm text-black font-medium">ชื่อวิชา</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="border rounded p-2 w-full text-sm text-black"
            required
          />
        </div>

        {/* หน่วยกิต */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">หน่วยกิต</label>
          <input
            type="number"
            value={subjectCredit}
            onChange={(e) => setSubjectCredit(e.target.value)}
            placeholder="1"
            className="border rounded p-2 w-full text-sm text-black"
            required
          />
        </div>

        {/* วันที่เรียน */}
        <div className="mb-2 col-span-3">
          <label className="block text-sm font-medium text-black">วันที่เรียน</label>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {days.map((day) => (
              <div key={day} className="flex items-center space-x-2 text-black">
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  checked={studyDays.includes(day)}
                  onChange={() => handleDaySelection(day)}
                />
                <label
                  htmlFor={day}
                  className={`text-sm text-black ${
                    studyDays.includes(day) 
                  }`}
                >
                  วัน{day}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ห้องเรียน */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-black">ห้องเรียน</label>
          <input
            type="text"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            className="border rounded p-2 w-full text-sm text-black"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-2 col-span-4">
          <label className="block text-sm font-medium text-black">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full resize-none text-sm text-black"
            rows={4}
          ></textarea>
        </div>

        {/* Sections and Times */}
        {sections.map((sec, index) => (
          <div key={index} className="col-span-4 grid grid-cols-4 gap-2 mb-2">
            {/* Section */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-black">Sec</label>
              <input
                type="text"
                value={sec.section}
                onChange={(e) =>
                  handleSectionChange(index, "section", e.target.value)
                }
                placeholder="1"
                className="border rounded p-2 w-full text-sm text-black"
                required
              />
            </div>

            {/* Time */}
            <div className="col-span-3">
              <label className="block text-sm font-medium text-black ">Time</label>
              <input
                type="text"
                value={sec.time}
                onChange={(e) =>
                  handleSectionChange(index, "time", e.target.value)
                }
                placeholder="Tue xx:xx - xx:xx"
                className="border rounded p-2 w-full text-sm text-black"
                required
              />
            </div>

            {/* ผู้สอน */}
            <div className="mb-2 col-span-3">
              <label className="block text-sm font-medium text-black">ผู้สอน</label>
              <input
                type="text"
                value={sec.professor}
                onChange={(e) =>
                  handleSectionChange(index, "professor", e.target.value)
                }
                className="border rounded p-2 w-full text-sm text-black"
                required
              />
            </div>
            {index > 0 && (
              <div className="col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="rounded px-2 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#dc2626"
                    className="size-5 mb-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="col-span-4">
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-green-500 text-white rounded px-2 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="CurrentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-2 pt-8">
        <button
          type="submit"
          className="bg-blue-900 text-white rounded px-4 py-2 w-1/5"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 text-white rounded px-4 py-2 w-1/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;