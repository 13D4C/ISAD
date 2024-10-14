const express = require('express');
const SectionController = require('../Controller/sectionController');
const router = express.Router();

router.get('/fetchSections/:subjectId', (req, res) => SectionController.fetchSections(req, res));
router.get('/getSections/:sectionId', (req, res) => SectionController.getSections(req, res));
//router.delete('/sections/:id', (req, res) => SectionController.deleteSection(req, res));
router.put('/sections/:id', (req, res) => SectionController.editSection(req, res));

module.exports = router;