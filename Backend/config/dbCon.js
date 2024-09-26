const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor(mongoURI) {
        this.mongoURI = mongoURI;
        this.connection = null;
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
            this.connection = mongoose.connection;
            console.log('Connected to database:', this.connection.db.databaseName);
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from database');
        } catch (error) {
            console.error('Failed to disconnect from MongoDB', error);
            throw error;
        }
    }
}

module.exports = Database;