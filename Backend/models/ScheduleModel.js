const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ScheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = ScheduleModel;