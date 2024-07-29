const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

router.post('/addsubject', async (req, res) => {
    try {
        let { subjectName, subjectKey, creditNum } = req.body;
        const existingSubject = await Subject.findOne({ subjectKey });
        if (existingSubject) {
            return res.status(400).json({ message: 'Subject already exists' });
        }

        const subject = new Subject({
            subjectName,
            subjectKey,
            creditNum,
        });

        await subject.save();
        res.status(201).json({ message: 'Created new subject!' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
