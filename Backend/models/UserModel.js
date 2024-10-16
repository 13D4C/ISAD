const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }],

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;