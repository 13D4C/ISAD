const express = require('express');
const SectionController = require('../Controller/sectionController');
const router = express.Router();

router.get('/fetchSections/:subjectId', (req, res) => SectionController.fetchSections(req, res));
router.delete('/sections/:id', (req, res) => SectionController.deleteSection(req, res));
router.post('/sections/:subjectId', (req, res) => SectionController.addSection(req, res));
router.put('/sections/:id', (req, res) => SectionController.editSection(req, res));

module.exports = router;