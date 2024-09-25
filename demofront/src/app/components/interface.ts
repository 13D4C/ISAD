export interface Section {
    section: number | null;
    time: string;
    professor: string;
    room: string;
    day: string;
}

export interface SubjectData {
    name: String;
    day: string[];
    subject_id: string;
    sections: Section[];
    studyDays: string[];
    professors: string[];
    detail: string;
    credit: number;
    style: string;
    midterm: Date;
    final: Date;
    midtermTime: String;
    finalTime: String;
}