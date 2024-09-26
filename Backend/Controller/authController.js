const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel'); // Ensure correct path to UserModel
const Student = require('../models/Student');
const Admin = require('../models/Admin');
require('dotenv').config();

class AuthController {
    constructor() {
        this.secretKey = process.env.SECRET_KEY || "9999";
    }

    async register(req, res) {
        try {
            let { username, email, password } = req.body;
            email = email.toLowerCase();

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // hash password
            const user = new UserModel({
                username, 
                email,
                password: hashedPassword,
            });

            await user.save(); // save user
            const student = new Student(user.username, user.password, user.email, user.role);
            res.status(201).json({ message: 'User created successfully', user: student.getName(), role: student.getRole()});
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
            const student = new Student(user.username, user.password, user.email, user.role);
            res.json({ token, email: student.email, message: "Login successfully!", role: student.role });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async adminLogin(req, res) {
        try {
            let { username, password } = req.body;

            const isValidAdmin = Admin.verifyAdmin( username, password);
            if (!isValidAdmin) {
                return res.status(401).json({ message: "Invalid admin credentials" });
            }
            const token = jwt.sign({ adminId: username }, this.secretKey, { expiresIn: '1h' })
            const admin = new Admin(username, password);
            return res.status(200).json({ token, message: "Login successfully!", role: admin.getRole()});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new AuthController();