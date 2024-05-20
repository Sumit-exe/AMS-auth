// //SAM
// // CustomBarChart.js
// import React, { useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
// } from 'recharts';
// import { format, subMonths, addMonths } from 'date-fns';

// // Sample Data
// const sampleData = {
//   Emp004: {
//     Attendance: [
//       { date: 'Wed May 1 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:00:00', isWorkingRemotely: true },
//       { date: 'Thu May 2 2024', sessionStartTime: '09:19:13', sessionEndTime: '17:11:00', isWorkingRemotely: false },
//       { date: 'Fri May 3 2024', sessionStartTime: '10:00:00', sessionEndTime: '15:00:00', isWorkingRemotely: true },
//       { date: 'Sun May 4 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:31:00', isWorkingRemotely: true },
//       { date: 'Mon May 5 2024', sessionStartTime: '08:30:00', sessionEndTime: '18:00:00', isWorkingRemotely: false },
//       { date: 'Tue May 6 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
//       { date: 'Wed May 7 2024', sessionStartTime: '09:44:13', sessionEndTime: '17:09:00', isWorkingRemotely: true },
//       { date: 'Thu May 8 2024', sessionStartTime: '09:00:00', sessionEndTime: '16:00:00', isWorkingRemotely: false },
//       { date: 'Fri May 9 2024', sessionStartTime: '09:30:00', sessionEndTime: '17:30:00', isWorkingRemotely: false },
//       { date: 'Sat May 10 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
//       { date: 'Sun May 11 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
//       { date: 'Mon May 12 2024', sessionStartTime: '09:15:00', sessionEndTime: '16:45:00', isWorkingRemotely: true },
//       { date: 'Tue May 13 2024', sessionStartTime: '08:45:00', sessionEndTime: '17:45:00', isWorkingRemotely: false },
//       { date: 'Wed May 14 2024', sessionStartTime: '10:00:00', sessionEndTime: '18:00:00', isWorkingRemotely: false },
//       { date: 'Thu May 15 2024', sessionStartTime: '09:00:00', sessionEndTime: '17:00:00', isWorkingRemotely: true },
//       { date: 'Fri May 16 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
//       { date: 'Sat May 17 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
//       { date: 'Sun May 18 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
//       { date: 'Wed June 1 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:00:00', isWorkingRemotely: false },
//       { date: 'Thu June 2 2024', sessionStartTime: '09:19:13', sessionEndTime: '17:11:00', isWorkingRemotely: false },
//       { date: 'Fri June 3 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: true },
//       { date: 'Sun June 4 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:31:00', isWorkingRemotely: true },
//       { date: 'Mon June 5 2024', sessionStartTime: '09:10:13', sessionEndTime: '16:55:00', isWorkingRemotely: true },
//       { date: 'Tue June 6 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
//       { date: 'Wed June 7 2024', sessionStartTime: '09:44:13', sessionEndTime: '17:09:00', isWorkingRemotely: false },
//     ],
//   },
// };

// const CustomBarChart = () => {
//   const [month, setMonth] = useState(new Date());

//   const formatDate = (dateString) => {
//     const [weekday, month, day, year] = dateString.split(' ');
//     return new Date(`${month} ${day}, ${year}`);
//   };

//   const calculateWorkHours = (start, end) => {
//     const startTime = new Date(`1970-01-01T${start}Z`);
//     const endTime = new Date(`1970-01-01T${end}Z`);
//     return (endTime - startTime) / (1000 * 60 * 60);
//   };

//   const filteredData = sampleData.Emp004.Attendance.filter((entry) => {
//     const entryDate = formatDate(entry.date);
//     return entryDate.getMonth() === month.getMonth() && entryDate.getFullYear() === month.getFullYear();
//   }).map((entry) => {
//     const workHours = calculateWorkHours(entry.sessionStartTime, entry.sessionEndTime);
//     return {
//       date: entry.date,
//       workHours,
//       isWorkingRemotely: entry.isWorkingRemotely,
//     };
//   });

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-white shadow rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={() => setMonth(subMonths(month, 1))}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
//         >
//           Previous Month
//         </button>
//         <span className="text-xl font-semibold">{format(month, 'MMMM yyyy')}</span>
//         <button
//           onClick={() => setMonth(addMonths(month, 1))}
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
//         >
//           Next Month
//         </button>
//       </div>
//       <div className="flex justify-between items-center mb-4">
//         <span className="flex items-center">
//           <span className="w-4 h-4 bg-[#169158] inline-block mr-2"></span> 
//           Remote: <span className="font-semibold ml-1">GREEN</span>
//         </span>
//         <span className="flex items-center">
//           <span className="w-4 h-4 bg-[#396ee5] inline-block mr-2"></span>
//           Office: <span className="font-semibold ml-1">BLUE</span>
//         </span>
//       </div>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="workHours">
//             {filteredData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.isWorkingRemotely ? '#169158' : '#396ee5'} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomBarChart;




import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { format, subMonths, addMonths } from 'date-fns';

// Sample Data
const sampleData = {
  Emp004: {
    Attendance: [
      { date: 'Wed May 1 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:00:00', isWorkingRemotely: true },
      { date: 'Thu May 2 2024', sessionStartTime: '09:19:13', sessionEndTime: '17:11:00', isWorkingRemotely: false },
      { date: 'Fri May 3 2024', sessionStartTime: '10:00:00', sessionEndTime: '15:00:00', isWorkingRemotely: true },
      { date: 'Sun May 4 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:31:00', isWorkingRemotely: true },
      { date: 'Mon May 5 2024', sessionStartTime: '08:30:00', sessionEndTime: '18:00:00', isWorkingRemotely: false },
      { date: 'Tue May 6 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
      { date: 'Wed May 7 2024', sessionStartTime: '09:44:13', sessionEndTime: '17:09:00', isWorkingRemotely: true },
      { date: 'Thu May 8 2024', sessionStartTime: '09:00:00', sessionEndTime: '16:00:00', isWorkingRemotely: false },
      { date: 'Fri May 9 2024', sessionStartTime: '09:30:00', sessionEndTime: '17:30:00', isWorkingRemotely: false },
      { date: 'Sat May 10 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
      { date: 'Sun May 11 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
      { date: 'Mon May 12 2024', sessionStartTime: '09:15:00', sessionEndTime: '16:45:00', isWorkingRemotely: true },
      { date: 'Tue May 13 2024', sessionStartTime: '08:45:00', sessionEndTime: '17:45:00', isWorkingRemotely: false },
      { date: 'Wed May 14 2024', sessionStartTime: '10:00:00', sessionEndTime: '18:00:00', isWorkingRemotely: false },
      { date: 'Thu May 15 2024', sessionStartTime: '09:00:00', sessionEndTime: '17:00:00', isWorkingRemotely: true },
      { date: 'Fri May 16 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
      { date: 'Sat May 17 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
      { date: 'Sun May 18 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: false },
      { date: 'Wed June 1 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:00:00', isWorkingRemotely: false },
      { date: 'Thu June 2 2024', sessionStartTime: '09:19:13', sessionEndTime: '17:11:00', isWorkingRemotely: false },
      { date: 'Fri June 3 2024', sessionStartTime: '00:00:00', sessionEndTime: '00:00:00', isWorkingRemotely: true },
      { date: 'Sun June 4 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:31:00', isWorkingRemotely: true },
      { date: 'Mon June 5 2024', sessionStartTime: '09:10:13', sessionEndTime: '16:55:00', isWorkingRemotely: true },
      { date: 'Tue June 6 2024', sessionStartTime: '09:10:13', sessionEndTime: '17:15:00', isWorkingRemotely: false },
      { date: 'Wed June 7 2024', sessionStartTime: '09:44:13', sessionEndTime: '17:09:00', isWorkingRemotely: false },
    ],
  },
};

const CustomBarChart = () => {
  const [month, setMonth] = useState(new Date());

  const formatDate = (dateString) => {
    const [weekday, month, day, year] = dateString.split(' ');
    return new Date(`${month} ${day}, ${year}`);
  };

  const calculateWorkHours = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}Z`);
    const endTime = new Date(`1970-01-01T${end}Z`);
    return (endTime - startTime) / (1000 * 60 * 60);
  };

  const filteredData = sampleData.Emp004.Attendance.filter((entry) => {
    const entryDate = formatDate(entry.date);
    return entryDate.getMonth() === month.getMonth() && entryDate.getFullYear() === month.getFullYear();
  }).map((entry) => {
    const workHours = calculateWorkHours(entry.sessionStartTime, entry.sessionEndTime);
    return {
      date: entry.date,
      workHours,
      isWorkingRemotely: entry.isWorkingRemotely,
    };
  });

  const totalMonthlyHours = filteredData.reduce((acc, entry) => acc + entry.workHours, 0);

  const CustomLabel = ({ x, y, width, value }) => {
    if (value < 9) {
      return (
        <g>
          <text x={x + width / 2} y={y - 10} fill="#FF0000" textAnchor="middle" dominantBaseline="middle" fontSize="12">
            ▼
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setMonth(subMonths(month, 1))}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Previous Month
        </button>
        <span className="text-xl font-semibold">{format(month, 'MMMM yyyy')}</span>
        <button
          onClick={() => setMonth(addMonths(month, 1))}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Next Month
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="flex items-center">
          <span className="w-4 h-4 bg-[#169158] inline-block mr-2"></span> 
          Remote: <span className="font-semibold ml-1">GREEN</span>
        </span>
        <span className="flex items-center">
          <span className="w-4 h-4 bg-[#396ee5] inline-block mr-2"></span>
          Office: <span className="font-semibold ml-1">BLUE</span>
        </span>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="workHours">
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isWorkingRemotely ? '#169158' : '#396ee5'} />
            ))}
            <LabelList dataKey="workHours" content={<CustomLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-end items-center mt-4">
        <span className="text-lg font-semibold">Total Monthly Hours: {totalMonthlyHours.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CustomBarChart;
