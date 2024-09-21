const mongoose = require('mongoose');
const Section = require('./Section');

class Subject {
    constructor() {
        const subjectSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            day: {
                type: [String],
            },
            subject_id: {
                type: String,
                required: true,
            },
            sections: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Section'
            }],
            Time: {  //(เวลาในการเรียนของคาบ)
                type: String,
            },
            professors: {
                type: [String],
            },
            detail: { //(description ของวิชา)
                type: String,
            },
            credit: { //(หน่วยกิต)
                type: Number,
                required: true,
            },
            style: {  //(คืออะไรนะ จำไม่ได้)
                type: String,
            },
            midterm: { //(วันสอบ midterm)
                type: Date,
            },
            final: { //(วันสอบ final)
                type: Date,
            },
            midtermTime: { //(เวลาในการสอบ midterm)
                type: String,
            },
            finalTime: { //(เวลาในการสอบ final)
                type: String,
            },
        });
        this.model = mongoose.model('Subject', subjectSchema);
    }

    //+ addSection()     |+ getProfessors()
}

module.exports = Subject;
