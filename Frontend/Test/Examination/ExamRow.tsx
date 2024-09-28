import React from 'react';

interface ExamRowProps {
  id: number;
  subjectCode: string;
  subjectName: string;
  examDate: string;
  examRoom: string;
}

const ExamRow: React.FC<ExamRowProps> = ({ id, subjectCode, subjectName, examDate, examRoom }) => {
  return (
    <tr>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{id}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{subjectCode}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{subjectName}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{examDate}</td>
      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{examRoom}</td>
    </tr>
  );
};

export default ExamRow;
