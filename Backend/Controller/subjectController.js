const SubjectModel = require('../models/SubjectModel');
const SectionModel  = require('../models/SectionModel');
const Subject = require('../models/Subject');
const Section = require('../models/Section');
const SectionController = require('../Controller/sectionController');

class SubjectController {
    async addSubject(req, res) {
        try {
            console.log(req.body);
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
                const savedSections = await SectionController.addSection(subject._id, sections);
                subject.sections = savedSections.map(sec => sec._id);
                subject.day = [...new Set(savedSections.map(sec => sec.day))];
                subject.professors = [...new Set(savedSections.map(sec => sec.professor))];
                subject.style = [...new Set(savedSections.map(sec => sec.style))];
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
            const subjects = await SubjectModel.find(); 
            res.status(200).json(subjects); 
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
