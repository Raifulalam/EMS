const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ error: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, phone, password: hashed });

        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, /*{ expiresIn: '7d' }*/);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
}