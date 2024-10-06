const SectionModel = require('../models/SectionModel');
const Section = require('../models/Section');

class SectionController {
    async addSection(ref_id, sections) {
        const sectionPromises = sections.map(sectionData => {
            const sectionInstance = new Section(
                ref_id,
                sectionData.subject_id,
                sectionData.schedule,
                sectionData.section,
                sectionData.professor,
                sectionData.style
            );
            console.log(sectionInstance);
            const section = new SectionModel(sectionInstance);
            return section.save();
        });
        return await Promise.all(sectionPromises); // Return all saved sections
    }

    async deleteSection(req, res) {
        try {
            const { id } = req.params;
            const deletedSection = await SectionModel.findOneAndDelete({ _id: id });
            if (!deletedSection) {
                return res.status(404).json({ message: 'Section not found' });
            }

            res.status(200).json({ message: 'Section deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async fetchSections(req, res) {
        try {
            const { subjectId } = req.params;
            const sections = await SectionModel.find({ subject_id: subjectId });

            if (!sections || sections.length === 0) {
                return res.status(404).json({ message: 'No sections found for this subject' });
            }

            res.status(200).json(sections);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = new SectionController();