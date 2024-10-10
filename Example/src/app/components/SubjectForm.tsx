import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Section, SubjectData } from '../components/interface';
import axios from "axios";

interface SubjectFormProps {
  onSubmit: (subjectData: SubjectData) => void;
  onClose: () => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onSubmit, onClose }) => {
  const [subjectID, setSubjectID] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCredit, setSubjectCredit] = useState<number>(0);
  const [style, setStyle] = useState<string>("");
  const [midtermDay, setMidtermDay] = useState<string>("");
  const [midtermTime, setMidtermTime] = useState<string>("");
  const [finalDay, setFinalDay] = useState<string>("");
  const [finalTime, setFinalTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    {subject_id: subjectID, section: null, schedule: [],  professor: "", style: "" },
  ]);


  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
  const handleDaySelection = (index: number, day: string) => {
    const updatedSections = [...sections];
    const schedule = updatedSections[index].schedule;
    const dayIndex = schedule.findIndex(s => s.day === day);

    if (dayIndex === -1) {
      schedule.push({ day, time: "", room: "" }); 
    } else {
      schedule.splice(dayIndex, 1);
    }
    setSections(updatedSections); 
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string,
    dayIndex?: number,
    subField?: "time" | "room"
  ) => {
    const updatedSections = [...sections];

    if (field === "section") {
      updatedSections[index][field] = value ? parseInt(value) : null;
    } else if (field === "professor" || field === "style") {
      updatedSections[index][field] = value;
    } else if (field === "schedule" && dayIndex !== undefined && subField) {
      const updatedSchedule = updatedSections[index].schedule;

      updatedSchedule[dayIndex] = {
        ...updatedSchedule[dayIndex],
        [subField]: value
      };
    }

    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { subject_id: subjectID, section: null, schedule: [], professor: "", style: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const professors = sections.map(sec => sec.professor).filter(Boolean);
    const subjectData: SubjectData = {
      subject_id: subjectID,
      name: subjectName,
      credit: subjectCredit,
      detail: description,
      sections,
      professors, 
      midterm: new Date(midtermDay), 
      final: new Date(finalDay),
      midtermTime: midtermTime,
      finalTime: finalTime,
      style: style,
      major,
    };
    try {
      const response = await axios.post('http://localhost:8888/api/addSubject', subjectData);
      console.log("Subject added:", subjectData); 
      onSubmit(subjectData);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };
  useEffect(() => {
    const updatedSections = sections.map(sec => ({
      ...sec,
      subject_id: subjectID,
    }));
    setSections(updatedSections);
  }, [subjectID]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-2 overflow-y-scroll pr-2 lg:pr-4 h-80">
        {/* รหัสวิชา */}
        <div className="mb-2">
          <label className="block text-sm font-medium">รหัสวิชา</label>
          <input
            type="text"
            value={subjectID}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSubjectID(e.target.value)
            }
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
        {/*สาขาวิชา*/}
        <div className="mb-2 col-span-4">
          <label className="block text-sm font-medium">ภาควิชา</label>
          <input
            value={major}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMajor(e.target.value)
            }
            className="border rounded p-2 w-full resize-none text-sm"
          ></input>
        </div>
        <div className="mb-2 col-span-4">
          <label className="block text-sm font-medium">รูปแบบวิชา</label>
          <input
            value={style}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStyle(e.target.value)
            }
            className="border rounded p-2 w-full resize-none text-sm"
          ></input>
        </div>
        {/* วันสอบ midterm */}
        <div className="mb-2 col-span-2">
          <label className="block text-sm font-medium">วันสอบกลางภาค</label>
          <input
            type="date"
            value={midtermDay}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMidtermDay(e.target.value)
            }
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>
        <div className="mb-2 col-span-2">
          <label className="block text-sm font-medium">ช่วงเวลา</label>
          <input
            type="text"
            value={midtermTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMidtermTime(e.target.value)
            }
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>

        {/* วันสอบ final */}
        <div className="mb-2 col-span-2">
          <label className="block text-sm font-medium">วันสอบปลายภาค</label>
          <input
            type="date"
            value={finalDay}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFinalDay(e.target.value)
            }
            className="border rounded p-2 w-full text-sm"
            required
          />
        </div>
        <div className="mb-2 col-span-2">
          <label className="block text-sm font-medium">ช่วงเวลา</label>
          <input
            type="text"
            value={finalTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFinalTime(e.target.value)
            }
            className="border rounded p-2 w-full text-sm"
            required
          />
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
          <div key={index} className="mb-2 col-span-4">
            {/* Section Input */}
            <div className="col-span-1">
              <label className="block text-sm font-medium">Sec</label>
              <input
                type="text"
                value={sec.section !== null ? sec.section.toString() : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleSectionChange(index, "section", e.target.value);
                }}
                placeholder="1"
                className="border rounded p-2 w-full text-sm"
                required
              />
            </div>
            {/* วันที่เรียน */}
            <div className="mb-2 col-span-4">
              <label className="block text-sm font-medium mt-2">วันที่เรียน</label>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {days.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${day}-${index}`}
                      checked={sec.schedule.some(s => s.day === day)} // Check if any schedule includes the day
                      onChange={() => handleDaySelection(index, day)}
                    />
                    <label
                      htmlFor={`${day}-${index}`}
                      className={`text-sm ${sec.schedule.some(s => s.day === day) ? "text-black" : "text-gray-500"}`}
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 mt-2 mb-2">
                <label className="block text-sm font-medium">
                  {sec.schedule.length > 0 ? "Time" : ""}
                </label>
                {sec.schedule.length > 0 && sec.schedule.map((scheduleEntry, dayIndex) => (
                  <input
                    key={`${scheduleEntry.day}-${dayIndex}`}
                    type="text"
                    value={scheduleEntry.time || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionChange(index, "schedule", e.target.value, dayIndex, "time")
                    }
                    placeholder="เวลา"
                    className="border rounded p-2 w-full text-sm mt-2"
                  />
                ))}
              </div>

              {/* Classroom */}
              <div className="mb-2">
                <label className="block text-sm font-medium mt-2">
                  {sec.schedule.length > 0 ? "ห้องเรียน" : ""}
                </label>
                {sec.schedule.length > 0 && sec.schedule.map((scheduleEntry, dayIndex) => (
                  <input
                    key={`${scheduleEntry.day}-${dayIndex}`}
                    type="text"
                    value={scheduleEntry.room || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionChange(index, "schedule", e.target.value, dayIndex, "room")
                    }
                    placeholder="ห้อง"
                    className="border rounded p-2 w-full text-sm mt-2"
                  />
                ))}
              </div>
            </div>




            {/* Professor */}
            <div className="col-span-4 grid grid-cols-2 gap-2 mb-2">
              <div className="mb-2">
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
              {/* รูปแบบการสอน */}
              <div className="mb-2">
                <label className="block text-sm font-medium">รูปแบบการสอน</label>
                <input
                  type="text"
                  value={sec.style}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSectionChange(index, "style", e.target.value)
                  }
                  className="border rounded p-2 w-full text-sm"
                  required
                />
              </div>
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