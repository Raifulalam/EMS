const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, getPosts, getPostById, getMyPosts, getPostsByUser } = require('../controllers/eventController');

router.post('/', auth, createPost);           // POST /api/posts
router.get('/', getPosts);                    // GET /api/posts
router.get('/my-posts', auth, getMyPosts);  // GET /api/posts/my-posts
router.get('/:id', getPostById);         // GET /api/posts/:id
router.get('/user/:userId', getPostsByUser);

module.exports = router;
