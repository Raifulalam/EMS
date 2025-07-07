const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { followUser, unfollowUser, userDetails } = require('../controllers/userController');

router.put('/follow/:id', auth, followUser);
router.put('/unfollow/:id', auth, unfollowUser);
router.get('/profile/:id', auth, userDetails);


module.exports = router;
