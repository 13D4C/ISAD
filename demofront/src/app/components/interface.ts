export interface Schedule {
    day: string;
    time: string;
    room: string;
    startTime: string;
    duration: number;
  }
  
  export interface Section {
    _id: string;
    ref_id: string;
    subject_id: string;
    section: number;
    professor: string;
    schedule: Schedule[];
    style: string;
  }
  
  export interface Subject {
    _id: string;
    name: string;
    subject_id: string;
    sections: string[]; // Array of section IDs
    professors: string[];
    detail: string;
    credit: number;
    style: string;
    midterm: Date;
    final: Date;
    midtermTime: string;
    finalTime: string;
    major: string;
  }
  
  export interface SubjectData extends Omit<Subject, 'sections'> {
    sections: Section[];
    schedules: Schedule[]; // Changed from optional to required
    code: string; // Changed from optional to required
    credits: number; // Changed from optional to required
    hasConflict: boolean;
    hidden: boolean;
  }