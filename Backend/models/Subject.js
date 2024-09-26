const mongoose = require('mongoose');
const Section = require('./Section');


//// อันนี้ใช้บ่ได้ ตั้งทิ้งไว้ก่อน (mongoose แม่งใช้กับ class ไม่ได้ ต้องทำเป็น model)
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