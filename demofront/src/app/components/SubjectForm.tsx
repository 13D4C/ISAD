import React, { useState, ChangeEvent, FormEvent } from "react";
import { Section, SubjectData } from '../components/interface';

interface SubjectFormProps {
  onSubmit: (subjectData: SubjectData) => void;
  onClose: () => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onSubmit, onClose }) => {
  const [subjectID, setSubjectID] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCredit, setSubjectCredit] = useState<number>(0);
  const [studyDays, setStudyDays] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    { section: null, time: "", day : "",professor: "", room: "" },
  ]);

  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  const handleDaySelection = (day: string) => {
    setStudyDays((prevStudyDays) => {
      if (prevStudyDays.includes(day)) {
        return prevStudyDays.filter((d) => d !== day);
      } else {
        return [...prevStudyDays, day];
      }
    });
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updatedSections = [...sections];
    if (field === "section") {
      updatedSections[index][field] = value ? parseInt(value) : null; // Ensure correct type
    } else {
      updatedSections[index][field] = value;
    }
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { section: null, time: "", day: "", professor: "", room: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subjectData: SubjectData = {
      subject_id: subjectID,
      name: subjectName,
      credit: subjectCredit,
      studyDays,
      detail: description,
      sections,
      day: [], // Assuming 'day' should be handled on the backend
      professors: [], // Assuming professors will be added later
      midterm: new Date(), // Default values, modify as needed
      final: new Date(),
      midtermTime: "",
      finalTime: "",
      style: ""
    };
    onSubmit(subjectData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2 overflow-y-scroll pr-2 lg:pr-4 h-80">
        {/* รหัสวิชา */}
        <div className="mb-2">
          <label className="block text-sm font-medium">รหัสวิชา</label>
          <input
            type="text"
            value={subjectID}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubjectID(e.target.value)
            }
            placeholder="06xxxx"
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>

        {/* ชื่อวิชา */}
        <div className="mb-2 col-span-2">
          <label className="block text-sm font-medium">ชื่อวิชา</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubjectName(e.target.value)
            }
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>

        {/* หน่วยกิต */}
        <div className="mb-2">
          <label className="block text-sm font-medium">หน่วยกิต</label>
          <input
            type="number"
            value={subjectCredit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubjectCredit(parseInt(e.target.value))
            }
            placeholder="1"
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>

        {/* วันที่เรียน */}
        <div className="mb-2 col-span-4">
          <label className="block text-sm font-medium">วันที่เรียน</label>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {days.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  checked={studyDays.includes(day)}
                  onChange={() => handleDaySelection(day)}
                />
                <label
                  htmlFor={day}
                  className={`text-sm ${studyDays.includes(day) ? "text-black" : "text-gray-500"
                    }`}
                >
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-2 col-span-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="border rounded p-2 w-full resize-none text-sm"
            rows={4}
          ></textarea>
        </div>

        {/* Sections, Times, Room, Professor */}
        {sections.map((sec, index) => (
          <div key={index} className="col-span-4 grid grid-cols-4 gap-2 mb-2">
            {/* Section */}
            <div className="col-span-1">
              <label className="block text-sm font-medium">Sec</label>
              <input
                type="text"
                value={sec.section !== null ? sec.section.toString() : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionChange(index, "section", e.target.value)
                }
                placeholder="1"
                className="border rounded p-2 w-full text-sm"
                required
              />
            </div>

            {/* Time */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Time</label>
              <input
                type="text"
                value={sec.time}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionChange(index, "time", e.target.value)
                }
                placeholder="Tue xx:xx - xx:xx"
                className="border rounded p-2 w-full text-sm"
                required
              />
            </div>

            {/* Classroom */}
            <div className="mb-2">
              <label className="block text-sm font-medium">ห้องเรียน</label>
              <input
                type="text"
                value={sec.room}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionChange(index, "room", e.target.value)
                }
                className="border rounded p-2 w-full text-sm"
                required
              />
            </div>

            {/* Professor */}
            <div className="mb-2 col-span-4">
              <label className="block text-sm font-medium">ผู้สอน</label>
              <input
                type="text"
                value={sec.professor}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSectionChange(index, "professor", e.target.value)
                }
                className="border rounded p-2 w-full text-sm"
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
          className="bg-blue-900 text-white rounded px-4 py-2 w-24"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-red-600 text-white rounded px-4 py-2 w-24"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;