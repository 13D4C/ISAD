const SubjectModel = require('../models/SubjectModel');
const SectionModel  = require('../models/SectionModel');
const Subject = require('../models/Subject');
const Section = require('../models/Section');

class SubjectController {
    async addSubject(req, res) {
        try {
            let { name, subject_id, sections, detail, credit, midterm, final, midtermTime, finalTime } = req.body;
            const existingSubject = await SubjectModel.findOne({ subject_id });
            if (existingSubject) {
                return res.status(400).json({ message: 'Subject already exists' });
            }

            const subjectInstance = new Subject({
                name, 
                subject_id, 
                detail, 
                credit, 
                midterm, 
                final, 
                midtermTime, 
                finalTime
            });

            const subject = new SubjectModel(subjectInstance);

            if (sections && sections.length > 0) {
                const sectionPromises = sections.map(sectionData => {
                    const sectionInstance = new Section(
                        subject._id,
                        sectionData.section,
                        sectionData.professor,
                        sectionData.room,
                        sectionData.day,
                        sectionData.time,
                        sectionData.style,
                    );
                    const section = new SectionModel(sectionInstance);
                    return section.save();
                });
                const savedSections = await Promise.all(sectionPromises);

                subject.sections = savedSections.map(sec => sec._id);

                const uniqueDays = [...new Set(savedSections.map(sec => sec.day))];
                subject.day = uniqueDays; // Save unique professors

                const uniqueProfessors = [...new Set(savedSections.map(sec => sec.professor))];
                subject.professors = uniqueProfessors; // Save unique professors

                const uniqueStyles = [...new Set(savedSections.map(sec => sec.style))];
                subject.style = uniqueStyles; // Save unique professors

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

    async fetchSubject(req, res) {
        try {
            const subjects = await SubjectModel.find().populate('sections'); // Fetch all subjects and populate sections
            const transformedSubjects = subjects.map(subjectData => {
                const subject = new Subject({
                    name: subjectData.name,
                    day: subjectData.day,
                    subject_id: subjectData.subject_id,
                    sections: subjectData.sections,
                    professors: subjectData.professors,
                    detail: subjectData.detail,
                    credit: subjectData.credit,
                    style: subjectData.style,
                    midterm: subjectData.midterm,
                    final: subjectData.final,
                    midtermTime: subjectData.midtermTime,
                    finalTime: subjectData.finalTime
                });
                return subject;
            });
            res.status(200).json(transformedSubjects); // Respond with the list of subjects
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error', error: e.message });
        }
    }

    async deleteSubject(req, res) {
        try {
            const { id } = req.params;
            const deletedSubject = await SubjectModel.findOneAndDelete({ subject_id: id });

            if (!deletedSubject) {
                return res.status(404).json({ message: 'Subject not found' }); 
            }
            await SectionModel.deleteMany({ subjectId: id });

            res.status(200).json({ message: 'Subject deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new SubjectController();
