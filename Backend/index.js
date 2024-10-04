const express = require('express');
const cors = require('cors');
const Database = require('./config/dbCon');
const subjectRoutes = require('./routes/subjectRoutes');
const authRoutes = require('./routes/authRoutes');
const sectionsRoutes = require('./routes/sectionsRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;

const mongoURI = process.env.MONGO_URI;
const db = new Database(mongoURI);

app.use(express.json());
app.use(cors());

app.use('/api', subjectRoutes);
app.use('/api', authRoutes);
app.use('/api', sectionsRoutes);

(async () => {
    try {
        await db.connect();
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.error('Error starting the application:', error);
    }

    process.on('SIGINT', async () => {
        await Database.disconnect();
        process.exit(0);
    });
})();
