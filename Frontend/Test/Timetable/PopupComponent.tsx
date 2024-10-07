import { useState } from "react";

interface Color {
  id: number;
  color: string;
}

const CharmSchoolComponent: React.FC = (closePopup) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colors: Color[] = [
    { id: 1, color: "bg-yellow-400" },
    { id: 2, color: "bg-pink-400" },
    { id: 3, color: "bg-green-400" },
    { id: 4, color: "bg-orange-400" },
    { id: 5, color: "bg-blue-400" },
    { id: 6, color: "bg-purple-400" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Course Title and Description */}
      <div>
        <h2 className="text-2xl text-black font-bold">90642999 CHARM SCHOOL</h2>
        <p className="text-gray-600 mt-2">
          เรียนรู้วิธีการสร้างเสน่ห์ให้ตนเองเพื่อการใช้ชีวิตและการทำงานในอนาคตอย่างมีความสุข
        </p>
      </div>

      {/* Section Select */}
      <div className="mt-4">
        <label htmlFor="section" className="block font-medium text-gray-700">
          Section
        </label>
        <select
          id="section"
          className="block w-32 px-4 py-2 mt-1 border border-gray-300 rounded-md text-sm text-black"
        >
          <option className="text-black">Sec 902</option>
          <option className="text-black">Sec 903</option>
          <option className="text-black">Sec 904</option>
        </select>
      </div>

      {/* Schedule */}
      <div className="mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-white text-gray-600">กลุ่มเรียน</th>
              <th className="px-4 py-2 bg-white text-gray-600">เวลา</th>
              <th className="px-4 py-2 bg-white text-gray-600">ห้องเรียน</th>
              <th className="px-4 py-2 bg-white text-gray-600">ตึก</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 bg-white text-black">902</td>
              <td className="px-4 py-2 bg-white text-black">WED 09:00 - 12:00</td>
              <td className="px-4 py-2 bg-white text-black">M 21</td>
              <td className="px-4 py-2 bg-white text-black">IT</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-black">903</td>
              <td className="px-4 py-2 text-black">WED 09:00 - 12:00</td>
              <td className="px-4 py-2 text-black">M 23</td>
              <td className="px-4 py-2 text-black">IT</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-black">904</td>
              <td className="px-4 py-2 text-black">WED 09:00 - 12:00</td>
              <td className="px-4 py-2 text-black">PJB 2</td>
              <td className="px-4 py-2 text-black">IT</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-600">
        <div className="flex gap-4">
          <div className="mr-8">
            <p>วันสอบกลางภาค:</p>
            <p>01/01/2024</p>
          </div>
          <div>
            <p>วันสอบปลายภาค:</p>
            <p>01/01/2024</p>
          </div>
        </div>
      </div>

      {/* Color Picker */}
      <div className="mt-6">
        <label className="block font-medium text-gray-700">เลือกสีในตาราง</label>
        <div className="flex justify-between items-center gap-4 mt-2">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`w-10 h-10 rounded-full cursor-pointer ${color.color} ${
                selectedColor === color.color ? "ring-4 ring-gray-400" : ""
              }`}
              onClick={() => handleColorSelect(color.color)}
            ></div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        {/* First Button */}
<button className="flex justify-center items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-800 w-64">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
  ซ่อนจากตาราง
</button>


<button className="flex justify-center items-center gap-2 bg-white text-red-500 px-4 py-2 rounded-md border border-red-500 w-64" aria-label="Remove from selected subjects">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
  นำออกจากวิชาที่เลือก
</button>


      </div>
    </div>
  );
};

export default CharmSchoolComponent;