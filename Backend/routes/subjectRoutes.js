const express = require('express');
const SubjectController = require('../Controller/subjectController');
const router = express.Router();

router.post('/addSubject', (req, res) => SubjectController.addSubject(req, res));
router.get('/fetchSubject', (req, res) => SubjectController.fetchSubject(req, res));

module.exports = router;
