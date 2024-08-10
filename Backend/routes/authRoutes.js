const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();

const SECRET_KEY = "9999"; 
const EMAIL_SECRET_KEY = "6666";
require('dotenv').config();

const transporter = nodemailer.createTransport({ // nodemailer setup
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'user email@gmail.com',
    subject: 'aloworld',
    text: `KUY kub isus`
};

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
            isVerified: false // new param to check if user is verified
        });
        const emailToken = jwt.sign({ userId: user._id }, EMAIL_SECRET_KEY, { expiresIn: '1h' });
        const url = `http://localhost:8888/api/verify/${emailToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER, // Ensure this is correctly set
            to: email,
            subject: 'Verify your email',
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
        };

        await transporter.sendMail(mailOptions);

        await user.save();
        res.status(201).json({ message: 'User created successfully. Please verify your email.', user, verificationUrl: url });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, EMAIL_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ message: 'Invalid verification link' });
        }
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
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
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, email: user.email, message: "Login successfully!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
