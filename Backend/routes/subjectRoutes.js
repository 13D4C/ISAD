const express = require('express');
const SubjectController = require('../Controller/subjectController');
const router = express.Router();

router.post('/addSubject', (req, res) => SubjectController.addSubject(req, res));
router.get('/fetchSubject/:id?', (req, res) => SubjectController.fetchSubject(req, res));

router.delete('/subjects/:id', (req, res) => SubjectController.deleteSubject(req, res));
router.put('/subjects/:id', (req, res) => SubjectController.editSubject(req, res));
router.post('/addSection/:id', (req, res) => SubjectController.addSection(req, res));
router.delete('/deleteSection/:id', (req, res) => SubjectController.deleteSection(req, res));


module.exports = router;