class Section {
    constructor(ref_id, subject_id, schedule, section, professor, style) {
        this.ref_id = ref_id;
        this.subject_id = subject_id;
        this.section = section;
        this.professor = professor;
        this.schedule = schedule;
        this.style = style;
    }
}

module.exports = Section;