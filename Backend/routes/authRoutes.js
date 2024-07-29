const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = "9999"; 

router.post('/register', async (req, res) => {
    try {
        let { username, email, password } = req.body;
        email = email.toLowerCase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, email: user.email, message: "Login successfully!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
