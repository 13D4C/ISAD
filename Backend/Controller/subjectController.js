const SubjectModel = require('../models/SubjectModel');
const SectionModel = require('../models/SectionModel');
const Subject = require('../models/Subject');
const Section = require('../models/Section');
const SectionController = require('../Controller/sectionController');

class SubjectController {
    async addSubject(req, res) {
        try {
            console.log(req.body);
            let { name, subject_id, sections, detail, credit, style, midterm, final, midtermTime, finalTime, major } = req.body;
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
                style,
                midtermTime,
                finalTime,
                major
            });

            const subject = new SubjectModel(subjectInstance);

            if (sections && sections.length > 0) {
                const savedSections = await SectionController.addSection(subject._id, sections);
                subject.sections = savedSections.map(sec => sec._id);
                subject.professors = [...new Set(savedSections.map(sec => sec.professor))];
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
            const { id } = req.params;
            if (id) {
                const subjects = await SubjectModel.findOne({ subject_id: id });
                res.status(200).json(subjects);
            } else {
                const subjects = await SubjectModel.find();
                res.status(200).json(subjects);
            }
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
            await SectionModel.deleteMany({ ref_id: deletedSubject._id });

            res.status(200).json({ message: 'Subject deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    async editSubject(req, res) {
        try {
            const { id } = req.params;
            const updatedSubject = req.body;
            const subject = await SubjectModel.findOne({ subject_id: id });
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            subject.set(updatedSubject);
            await subject.save();
            return res.status(200).json(subject);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async addSection(req, res) {
        try {
            const { id } = req.params;
            const sections = req.body;

            const existingSubject = await SubjectModel.findOne({ subject_id: id });
            console.log(sections);
            if (!existingSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            const savedSection = await SectionController.addSection(existingSubject._id, sections);
            savedSection.forEach(sec => {
                existingSubject.sections.push(sec._id);
                existingSubject.professors.addToSet(sec.professor);
            });

            await existingSubject.save();

            res.status(201).json({ message: 'Section added successfully!', section: savedSection });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error', error: e.message });
        }
    }
    async deleteSection(req, res) {
        try {
            const { id } = req.params;
            const sectionIdsToDelete = req.body; // เลข Object ใน subject
            console.log(sectionIdsToDelete);
            console.log(id);
            const existingSubject = await SubjectModel.findOne({ subject_id: id });
            if (!existingSubject) {
                return res.status(404).json({ message: 'Subject not found' });
            }

            // เรียกใช้ SectionController เพื่อลบ sections
            const deleteResponse = await SectionController.deleteSection({ body: { subjectId: id, sectionIndicesToDelete: sectionIdsToDelete } }, res);
            if (deleteResponse.status !== 200) {
                return res.status(deleteResponse.status).json(deleteResponse.data);
            }

            await existingSubject.save(); // บันทึกการเปลี่ยนแปลง 

            res.status(200).json({ message: 'Subject sections updated after deletion', sectionIds: sectionIdsToDelete });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


}

module.exports = new SubjectController();