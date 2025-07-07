const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Event = require('../models/Event');

router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });

        // Example revenue logic (if you store payments):
        const revenue = await Event.aggregate([
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);

        res.json({
            totalUsers,
            totalEvents,
            upcomingEvents,
            revenue: revenue[0]?.total || 0
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
