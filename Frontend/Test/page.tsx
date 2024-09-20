import React from 'react';

const ScheduleTable = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '18:00'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 mt-5 px-4 md:px-0">
      <div className="container mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full md:w-auto">
        {/* Flex container to align title and buttons on opposite sides */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-xl md:text-3xl font-medium text-black dark:text-white mb-4 md:mb-0">
            จัดตารางเรียน
          </h2>
          
          {/* Buttons aligned to the right */}
          <div className="flex space-x-2 md:space-x-4">
            <button className="bg-white text-black py-2 md:py-3 px-4 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางเรียน
            </button>
            <button className="bg-white text-black py-2 md:py-3 px-4 md:px-8 rounded-lg border border-gray-300 shadow-md hover:bg-blue-700 hover:text-white transition-all">
              ตารางสอบ
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-auto max-h-[500px] border border-gray-200 rounded-lg shadow-lg dark:border-none">
          <table className="w-full border-collapse bg-white dark:bg-gray-200 text-sm md:text-base">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="border-b border-r border-gray-300 p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                  Time Table
                </th>
                {hours.map(hour => (
                  <th key={hour} className="border-b border-r border-gray-300 p-4 md:p-6 text-center font-semibold dark:border-black text-black">
                    {hour}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="border-b border-r border-gray-300 p-4 md:p-6 font-semibold text-black text-center dark:border-black">
                    {day}
                  </td>
                  {hours.map(hour => (
                    <td key={`${day}-${hour}`} className="border-b border-r p-4 md:p-6 border-gray-200 dark:border-black hover:bg-indigo-100 transition-all"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom section with export button and summary */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <button className="bg-blue-700 text-white border border-blue-00 py-2 px-6 rounded-lg shadow-md text-sm hover:bg-blue-600 transition-all mb-4 md:mb-0">
            Export PNG
          </button>
          <span className="text-sm text-gray-600">หน่วยกิตรวมในตาราง 0 หน่วยกิต</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
