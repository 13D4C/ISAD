const mongoose = require('mongoose');

const subjectScheduleSchema = new mongoose.Schema({
    day: {
        type: String,
    },
    time: {
        type: String,
    },
    room: {
        type: String,
    }
});

const sectionSchema = new mongoose.Schema({
    ref_id: {
        type: mongoose.Schema.Types.ObjectId, // Foreign key
        ref: 'Subject',
    },
    subject_id: {
        type: String,
    },
    section: {
        type: Number,
    },
    professor: {
        type: String,
    },
    schedule: [subjectScheduleSchema],
    style: {
        type: String,
    }
});

const sectionModel = mongoose.model('Section', sectionSchema);

module.exports = sectionModel;