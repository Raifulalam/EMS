const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment } = require('../controllers/commentController');

router.post('/:postId', auth, addComment);

module.exports = router;
