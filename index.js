const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8888
const SECRET_KEY = '9999'
const mongoURI = "mongodb+srv://66070137:server2548@server.wggwl.mongodb.net/?retryWrites=true&w=majority&appName=server";
// เปลี่ยน url mongodb "mongodb+srv://Nettae:nkzhcHd3ZBmOmnoN@cluster0.m4azkwi.mongodb.net/?appName=Cluster0"; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subject: [String],
})

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        let { username, email, password } = req.body; 
        email = email.toLowerCase();
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        const user = new User ({
            username,
            email,
            password: hashedPassword,
        });

        await user.save(); // save user
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

app.post('/login', async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user || !(await bcrypt.compare(password, user.password))) { // email or password not match
            return res.status(401).json({ message: 'Invalid email or password' }); 
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' }); // user's token
        res.json({ token, email: user.email, message: "Login successfully!" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});