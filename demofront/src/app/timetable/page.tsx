import React from 'react';

const ScheduleTable = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00'];

  return (
    // Flex container to center the entire content
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white-500 to-white-600">
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-xl">
        {/* Flex container to align title and buttons on opposite sides */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-white">จัดตารางเรียน</h2>
          
          {/* Buttons aligned to the right */}
          <div className="flex space-x-4">
            <button className="mr-2 bg-gray-200 text-black py-2 px-6 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-300 transition-all">ตารางเรียน</button>
            <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-sm hover:bg-indigo-700 transition-all">ตารางสอบ</button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md dark:border-none">
          <table className="w-full border-collapse bg-white dark:bg-gray-200">
            <thead className="bg-indigo-50 dark:bg-blue-600">
              <tr>
                <th className="border-b border-r border-gray-300 p-4 text-center font-semibold dark:border-black text-indigo-700">Time Table</th>
                {hours.map(hour => (
                  <th key={hour} className="border-b border-r border-gray-300 p-4 text-center font-semibold dark:border-black text-indigo-700">{hour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="border-b border-r border-gray-300 p-4 font-semibold text-indigo-700 text-center dark:border-black">{day}</td>
                  {hours.map(hour => (
                    <td key={`${day}-${hour}`} className="border-b border-r p-4 border-gray-200 dark:border-black hover:bg-indigo-100 transition-all"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button className="bg-white border border-gray-300 py-2 px-6 rounded-lg shadow-sm text-sm hover:bg-gray-100 transition-all">Export PNG</button>
          <span className="text-sm text-gray-600">หน่วยกิตรวมในตาราง 0 หน่วยกิต</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
