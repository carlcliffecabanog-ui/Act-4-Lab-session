const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const statsRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/upload');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/stats', statsRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});