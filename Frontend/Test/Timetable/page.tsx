import React from 'react';

const ScheduleTable = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-blue-900">จัดตารางเรียน</h2>
      
      <div className="mb-6 flex">
        <button className="mr-2 bg-gray-200 text-black py-2 px-6 rounded border border-gray-300">ตารางเรียน</button>
        <button className="bg-gray-800 text-white py-2 px-6 rounded">ตารางสอบ</button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="border-b border-r border-gray-300 p-2 text-center font-semibold">Time Table</th>
              {hours.map(hour => (
                <th key={hour} className="border-b border-r border-gray-300 p-2 text-center font-semibold">{hour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day}>
                <td className="border-b border-r border-gray-300 p-2 font-semibold text-blue-600 text-center">{day}</td>
                {hours.map(hour => (
                  <td key={`${day}-${hour}`} className="border-b border-r border-gray-300 p-2"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-white border border-gray-300 py-2 px-6 rounded text-sm">Export PNG</button>
        <button className="bg-white border border-gray-300 py-2 px-6 rounded text-sm">แสดงตารางเรียนแบบย่อ</button>
        <span className="text-sm text-gray-600">หน่วยกิตรวมในตาราง 0 หน่วยกิต</span>
      </div>
    </div>
  );
};

export default ScheduleTable;