const express = require('express');
const SubjectController = require('../Controller/subjectController');
const router = express.Router();

router.post('/addSubject', (req, res) => SubjectController.addSubject(req, res));
router.get('/fetchSubject/:id?', (req, res) => SubjectController.fetchSubject(req, res));
router.delete('/subjects/:id', (req, res) => SubjectController.deleteSubject(req, res));

module.exports = router;