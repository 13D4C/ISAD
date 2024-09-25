const Subject = require('../models/Subject');
const SectionModel  = require('../models/SectionModel');
const SubjectModel = require('../models/SubjectModel');

class SubjectController {
    async addSubject(req, res) {
        try {
            let { name, subject_id, sections, detail, credit, style, midterm, final, midtermTime, finalTime } = req.body;
            const existingSubject = await SubjectModel.findOne({ subject_id });
            if (existingSubject) {
                return res.status(400).json({ message: 'Subject already exists' });
            }

            const subject = new SubjectModel({
                name, 
                subject_id, 
                detail, 
                credit, 
                style, 
                midterm, 
                final, 
                midtermTime, 
                finalTime
            });

            if (sections && sections.length > 0) {
                const sectionPromises = sections.map(sectionData => {
                    const section = new SectionModel({
                        subject_id: subject._id,
                        section: sectionData.section,
                        professor: sectionData.professor,
                        room: sectionData.room,
                        day: sectionData.day,
                        time: sectionData.time
                    });
                    return section.save();
                });
                const savedSections = await Promise.all(sectionPromises);

                subject.sections = savedSections.map(sec => sec._id);

                const uniqueDays = [...new Set(savedSections.map(sec => sec.day))];
                subject.day = uniqueDays; // Save unique professors

                const uniqueProfessors = [...new Set(savedSections.map(sec => sec.professor))];
                subject.professors = uniqueProfessors; // Save unique professors

                await subject.save(); 
            } else {
                await subject.save();
            }

            res.status(201).json({ message: 'Created new subject!' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error', error: e.message });
        }
    }
}

module.exports = new SubjectController();
