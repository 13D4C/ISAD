"use client";

import React from 'react';

// Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
    {children}
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-black mb-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base mb-4">{children}</p>
);

// Main Component
const AboutITNextReg: React.FC = () => {
  return (
    <Container>
      <Section title="เกี่ยวกับเรา">
        <Paragraph>
          <strong>เกี่ยวกับ ระบบจัดการตารางเรียนและตารางสอบ (ITNextReg)</strong>
        </Paragraph>
        <Paragraph>
          ITNextReg คือระบบจัดการตารางเรียนและตารางสอบ เป็นระบบที่ใช้ในการจัดการตารางเรียนและตารางสอบสำหรับสถาบันการศึกษา ระบบนี้มักถูกพัฒนาเพื่อตอบสนองความต้องการในการบริหารจัดการข้อมูลของนักเรียน นักศึกษา และเจ้าหน้าที่ที่เกี่ยวข้องกับการเรียนการสอน โดยเฉพาะในส่วนของการลงทะเบียน การจัดตารางเรียน และการวางแผนตารางสอบ
        </Paragraph>
        <Paragraph>
          ด้วยเหตุนี้ ทางทีมงานจึงได้พัฒนา ITNextReg ขึ้น เพื่อให้สามารถค้นหาและเลือกรายวิชาได้อย่างสะดวก และจัดตารางเรียนตามข้อจำกัดของหลักสูตรของแต่ละคนได้ง่ายขึ้น
        </Paragraph>
        <Paragraph>
          ทางทีมงานมีความมุ่งมั่นที่จะทำให้ ITNextReg เป็นเว็บไซต์ศูนย์กลางที่รวบรวมข้อมูลรายวิชาไว้ได้อย่างครบถ้วน และมุ่งที่จะสร้างเว็บไซต์นี้ให้เป็นพื้นที่สำหรับการแบ่งปันข้อมูลรายวิชาระหว่างนักศึกษาในอนาคต
        </Paragraph>
      </Section>

      <Section title="หมายเหตุ">
        <Paragraph>
          ทั้งนี้ ITNextReg เป็นเพียงเครื่องมือที่ช่วยให้การวางแผนลงทะเบียนเรียนง่ายขึ้น แต่ไม่ใช่การลงทะเบียนเรียนจริง คุณสามารถลงทะเบียนเรียนได้ที่{" "}
          <a href="https://new.reg.kmitl.ac.th/reg" className="text-blue-600">
            https://new.reg.kmitl.ac.th/reg
          </a>{" "}
          เพียงช่องทางเดียวเท่านั้น
        </Paragraph>
      </Section>

      <Section title="เกี่ยวกับโปรเจค">
        <Paragraph>
          เว็บไซต์นี้เป็นส่วนหนึ่งของวิชาการวิเคราะห์และออกแบบระบบสารสนเทศ (Information System Analysis and Design) รหัส 06066304 ภาคเรียนที่ 1 ปีการศึกษา 2567 คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
        </Paragraph>
      </Section>
    </Container>
  );
};

export default AboutITNextReg;

