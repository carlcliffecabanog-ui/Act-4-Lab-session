
const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

// GET /api/students
// Populate User information
router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find()
            .populate('createdBy', 'email role');

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/students
router.post('/', requireAuth, async (req, res) => {
    try {
        const newStudent = await Student.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            isActive: req.body.isActive,
            createdBy: req.user.id
        });

        const populatedStudent = await Student.findById(newStudent._id)
            .populate('createdBy', 'email role');

        res.status(201).json(populatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/students/:id
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'email role');

        if (!updatedStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/students/:id
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully',
            deletedStudent
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
