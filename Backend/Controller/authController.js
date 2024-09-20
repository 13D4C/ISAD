const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel'); // Ensure correct path to UserModel
const User = require('../models/User');
require('dotenv').config();

class AuthController {
    constructor() {
        this.secretKey = process.env.SECRET_KEY || "9999";
    }

    async register(req, res) {
        try {
            let { name, email, password } = req.body;
            email = email.toLowerCase();

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // hash password
            const user = new UserModel({
                name, 
                email,
                password: hashedPassword,
            });

            await user.save(); // save user
            const userInstance = new User(user.name, user.password, user.email, user.role);
            res.status(201).json({ message: 'User created successfully', user: userInstance.getName(), additionalInfo: '!!!'});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user._id }, this.secretKey, { expiresIn: '1h' });
            res.json({ token, email: user.email, message: "Login successfully!" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async adminLogin(req, res) {
        // Implement admin login logic here if needed
    }
}

module.exports = new AuthController();
