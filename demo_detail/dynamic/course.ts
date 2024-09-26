// pages/api/course.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const course = {
    code: "06066304",
    name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
    faculty: "Information Technology",
    department: "เทคโนโลยีสารสนเทศ",
    type: "LEC",
    credits: "3(3-0-6)",
    midtermExam: "เสาร์ 2 กันยายน 2566 13:30 - 16:30",
    finalExam: "ศุกร์ 3 พฤศจิกายน 2566 13:30 - 16:30",
    gradingMethod: "เป็นไปตามอาจารย์ผู้สอน",
    descriptionTH: "การพัฒนาโดยใช้แนวคิดเชิงวัตถุ การวิเคราะห์และออกแบบ...",
    descriptionEN: "Material-based development, analysis and design...",
    sections: [
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 1 -73",
        section: "1",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "TUE", time: "09:00-12:00", room: "M23", type: "LEC" }
        ]
      },
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 74-146",
        section: "2",
        instructors: ["ผศ.ดร. พัฒนพงษ์ ฉันทมิตรโอภาส"],
        schedule: [
          { day: "TUE", time: "09:00-12:00", room: "M03", type: "LEC" }
        ]
      },
      {
        group: "สาขาเทคโนโลยีสารสนเทศ ลำดับที่ 147-220",
        section: "3",
        instructors: ["ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล"],
        schedule: [
          { day: "TUE", time: "13:00 - 16:00", room: "M23", type: "LEC" }
        ]
      }
    ]
  };

  res.status(200).json(course);
}
