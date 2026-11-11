
const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

// GET /api/stats
router.get('/', requireAuth, async (req, res) => {
    try {
        const statistics = await Student.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: null,
                    totalStudents: { $sum: 1 },
                    activeStudents: {
                        $sum: {
                            $cond: [
                                { $eq: ['$isActive', true] },
                                1,
                                0
                            ]
                        }
                    },
                    inactiveStudents: {
                        $sum: {
                            $cond: [
                                { $eq: ['$isActive', false] },
                                1,
                                0
                            ]
                        }
                    },
                    averageAge: { $avg: '$age' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalStudents: 1,
                    activeStudents: 1,
                    inactiveStudents: 1,
                    averageAge: {
                        $round: ['$averageAge', 2]
                    }
                }
            }
        ]);

        res.json(statistics[0] || {
            totalStudents: 0,
            activeStudents: 0,
            inactiveStudents: 0,
            averageAge: null
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
    