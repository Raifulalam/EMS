const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token, access denied' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id); // fetch full user
        if (!user) return res.status(404).json({ error: 'User not found' });

        req.user = user; // full user object
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
