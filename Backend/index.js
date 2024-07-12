const mongoose = require('mongoose')
const express = require('express')

const app = express()
app.use(express.json())

const mongoURI = 'mongoconnection' // มาเติมอีกที

const PORT = 8888

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    subject: []
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
