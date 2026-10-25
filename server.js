const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
app.use(express.json());

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount student routes
app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(err));

app.listen(3000, () => console.log('Server running on port 3000'));