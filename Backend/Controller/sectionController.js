const SectionModel = require('../models/SectionModel');
const Section = require('../models/Section');
const SubjectModel = require('../models/SubjectModel');

class SectionController {
    async addSection(ref_id, sections) {
        if (!Array.isArray(sections)) {
            sections = [sections];
        }
        const sectionPromises = sections.map(async(sectionData) => {
            console.log(sections);
            try {
                const sectionInstance = new Section(
                    ref_id,
                    sectionData.subject_id,
                    sectionData.schedule,
                    sectionData.section,
                    sectionData.professor,
                    sectionData.style
                );
                console.log("Section instance created:", sectionInstance);

                const section = new SectionModel(sectionInstance);
                console.log("Section instance created:", section);
                return await section.save();
            } catch (error) {
                console.error("Error saving section:", sectionData, error);
                throw error; // ถ้าต้องการให้แสดง error ทั้งหมด
            }
        });

        // รอให้ทุก section ถูกบันทึกสำเร็จ
        return await Promise.all(sectionPromises);
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