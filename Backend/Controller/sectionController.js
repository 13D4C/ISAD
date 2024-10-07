const SectionModel = require('../models/SectionModel');
const Section = require('../models/Section');
const SubjectModel = require('../models/SubjectModel');

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

    async deleteSection(req, res) {
            try {
                const { id } = req.params;
                const sectionIndicesToDelete = req.body;

                const subject = await SubjectModel.findOne({ subject_id: id });

                if (!subject || !subject.sections.length) {
                    return res.status(404).json({ message: 'Sections not found' });
                }

                sectionIndicesToDelete.forEach(index => {
                    if (subject.sections[index]) {
                        subject.sections.splice(index, 1);
                    }
                });

                // รีเซ็ตค่า index ของ sections
                subject.sections = subject.sections.filter(Boolean); // ลบค่า undefined หรือ null

                await subject.save(); // บันทึกการเปลี่ยนแปลง

                return res.status(200).json(subject); // ส่งกลับ subject ที่อัปเดต

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        /* 
            async deleteSection(req, res) {
            try {
                const { id } = req.params;
                const sectionIndicesToDelete = req.body;
                const sections = await SectionModel.find({ subject_id: id });

                if (!sections || sections.length === 0) {
                    return res.status(404).json({ message: 'Sections not found' });
                }

                const sectionsToDelete = sectionIndicesToDelete.filter(index => sections[index]);

                await Promise.all(sectionsToDelete.map(async index => {
                    if (sections[index]) {
                        await SectionModel.deleteOne({ _id: sections[index]._id }); // ลบด้วย _id
                    }
                }));

                // หาหมายเลข section ที่เหลืออยู่
                const updatedSections = await SectionModel.find({ subject_id: id });

                return res.status(200).json(updatedSections); // ส่งกลับ sections ที่อัปเดต

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        */



    async editSection(req, res) {
        try {
            const { id } = req.params;
            const updatedSections = req.body;
            const sections = await SectionModel.find({ subject_id: id });

            if (!sections || sections.length === 0) {
                return res.status(404).json({ message: 'Sections not found' });
            }

            updatedSections.forEach((updatedSection, index) => {
                if (sections[index]) {
                    sections[index].set(updatedSection);
                }
            });

            await Promise.all(sections.map(section => section.save()));
            console.log(sections);
            return res.status(200).json(sections);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new SectionController();