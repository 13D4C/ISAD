const mongoose = require('mongoose');

//// อันนี้ใช้บ่ได้ ตั้งทิ้งไว้ก่อนรอแก้ (mongoose แม่งใช้กับ class ไม่ได้ ต้องทำเป็น model)

class Section {
    constructor() {
        const sectionSchema = new mongoose.Schema({
            subject_id: {
                type: mongoose.Schema.Types.ObjectId, //Foreign key
                ref: 'Subject',   
                required: true         
            },
            section: {
                type: String,
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
        });
        this.model = mongoose.model('Section', sectionSchema);
    }
    // getDetails()
}

module.exports = Section;