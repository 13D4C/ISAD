const express = require('express');
const router = express.Router();
const ScheduleController = require('../Controller/scheduleController');

router.post('/schedule/create', (req, res) => ScheduleController.createSchedule(req, res));
router.get('/schedule/:userId', (req, res) => ScheduleController.getSchedule(req, res));
router.put('/schedule/:userId', (req, res) => ScheduleController.updateSchedule(req, res));
router.delete('/schedule/:userId/:scheduleId', (req, res) => ScheduleController.deleteSchedule(req, res));

module.exports = router;