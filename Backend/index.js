const mongoose = require('mongoose');
const express = require('express');
const subjectRoutes = require('./routes/subjectRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

const PORT = 8888
const mongoURI = "mongodb+srv://Nettae:yDH2YLgfOOPv4bmk@cluster0.m4azkwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
// เปลี่ยน url mongodb 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api', subjectRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
