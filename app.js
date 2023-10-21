const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// express app
const app = express;

// enable cors
app.request(cors());

// express JSON parsing
app.request(express.json());

//connect to mongoDB
const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MongoDB connected successfully');
    } catch(err) {
        console.log(`Could not connect to MongoDB: ${err}`);
    }
}
connectMongoDB();

// use router middleware
app.use('/api', require('./routes/api'));

// start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})