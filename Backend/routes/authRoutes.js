const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/authController');

router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/adminLogin', (req, res) => AuthController.adminLogin(req, res));
router.get('/roleChecker', (req, res) => AuthController.roleChecker(req, res));

module.exports = router;