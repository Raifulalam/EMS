const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, getUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');



router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getCurrentUser);
router.get('/users', getUsers);

module.exports = router;
