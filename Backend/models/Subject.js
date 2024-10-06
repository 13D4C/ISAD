class Subject {
    constructor({ name, subject_id, sections, professors, detail, credit, style, midterm, final, midtermTime, finalTime, major }) {
        this.name = name;
        this.subject_id = subject_id;
        this.sections = sections;
        this.professors = professors;
        this.detail = detail;
        this.credit = credit;
        this.style = style;
        this.midterm = midterm;
        this.final = final;
        this.midtermTime = midtermTime;
        this.finalTime = finalTime;
        this.major = major;
    }
}

module.exports = Subject;