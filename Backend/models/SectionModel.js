const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    subject_id: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'Subject',
        required: true
    },
    section: {
        type: Number,
    },
    professor: {
        type: String,
    },
    room: {
        type: String,
    },
    day: {
        type: String,
    },
    time: {
        type: String,
    },
    style: {
        type: String,
    }
});

const sectionModel = mongoose.model('Section', sectionSchema);

module.exports = sectionModel;
