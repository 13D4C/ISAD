class Section {
    constructor(ref_id, subject_id, section, professor, room, day, time, style) {
        this.ref_id = ref_id;
        this.subject_id = subject_id;
        this.section = section;
        this.professor = professor;
        this.room = room;
        this.day = day;
        this.time = time;
        this.style = style;
    }
}

module.exports = Section;
