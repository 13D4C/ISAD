"use client";
import React from 'react';

interface ExamRowProps {
  id: number;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  examTime: string;
}

const ExamRow: React.FC<ExamRowProps> = ({ id, subjectCode, subjectName, examDate, examTime }) => {
  return (
    <tr>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{id}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{subjectCode}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{subjectName}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{examDate}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{examTime}</td>
    </tr>
  );
};

export default ExamRow;
