const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    subjectKey: {
        type: String,
        required: true,
        unique: true,
    },
    creditNum: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Subject', subjectSchema);