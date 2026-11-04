
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }
        if (password.length < 8) {
    return res.status(400).json({
        error: 'Password must be at least 8 characters'
    });
}

        const existingUser = await User.findOne({ email });
        

        if (existingUser) {
            return res.status(409).json({
                error: 'Email already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
    email,
    password: hashedPassword
});

        await user.save();

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
    token,
    user: {
        id: user._id,
        email: user.email
    }
});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
