const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    style: {
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
    major: { //(เวลาในการสอบ final)
        type: String,
    },
});

const SubjectModel = mongoose.model('Subject', subjectSchema);

module.exports = SubjectModel;