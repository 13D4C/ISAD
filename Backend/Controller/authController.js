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
            const userInstance = new Student({
                username, 
                email,
                password: hashedPassword,
            });
            const user = new UserModel(userInstance.username, userInstance.email, userInstance.password);

            await user.save(); // save user
            res.status(201).json({ message: 'User created successfully', user: userInstance.getName(), role: userInstance.getRole()});
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

            const student = new Student(user.username, user.password, user.email);
            const token = jwt.sign({ userId: user._id , username: student.getName(), role: student.getRole()}, this.secretKey, { expiresIn: '1h' });
            res.json({ 
                token, 
                email: student.getEmail(), 
                message: "Login successfully!", 
                role: student.getRole(),
                userId: user._id // Include the userId in the response
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async adminLogin(req, res) {
        try {
            let { username, password } = req.body;

            const isValidAdmin = Admin.verifyAdmin(username, password);
            if (!isValidAdmin) {
                return res.status(401).json({ message: "Invalid admin credentials" });
            }
            const admin = new Admin(username, password);
            const token = jwt.sign({ adminId: username, role: admin.getRole() }, this.secretKey, { expiresIn: '1h' })
            return res.status(200).json({ token, message: "Login successfully!", role: admin.getRole()});
        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
    async roleChecker(req, res) {
        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
        try {
            const decoded = jwt.verify(token, this.secretKey);

            if (decoded && decoded.role) {
                if (decoded.role === "admin") {
                    res.json({ message: "Access granted", role: decoded.role });
                } 
            } else {
                res.status(401).json({ message: 'Unauthorized: No role found' });
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }
}

module.exports = new AuthController();
