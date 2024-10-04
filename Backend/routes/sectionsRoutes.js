const express = require('express');
const SectionController = require('../Controller/sectionController');
const router = express.Router();

router.get('/fetchSections/:subjectId', SectionController.fetchSections);
router.delete('/sections/:subjectId', SectionController.deleteSection);
router.post('/sections/:subjectId', SectionController.addSection);

module.exports = router;
