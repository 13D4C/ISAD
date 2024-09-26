class Section {
    constructor(subject_id, section, professor, room, day, time, style) {
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
