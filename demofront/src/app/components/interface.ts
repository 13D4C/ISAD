export interface Section {
    subject_id: string;
    section: number | null;
    professor: string;
    schedule: {
        day: string; 
        time: string;
        room: string; 
    }[];
    style: string;
}


export interface SubjectData {
    name: string;
    subject_id: string;
    sections: Section[];
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