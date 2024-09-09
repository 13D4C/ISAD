const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(200).json({ message: 'No query provided' });
        }
        const results = await Subject.find({
            subjectName: new RegExp(query, 'i')
        });

        res.json(results);
    } catch (err) {
        console.error('Error in search route:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;