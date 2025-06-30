const Post = require('../models/EventsList');

exports.createPost = async (req, res) => {
    try {
        console.log("User from token:", req.user);  // Check that req.user has id
        console.log("Post content:", req.body.content);  // Check content

        const post = await Post.create({
            author: req.user.id,  // Make sure this refers to the correct field in your User model
            content: req.body.content
        });

        // Now fetch and return the populated post
        const populatedPost = await Post.findById(post._id).populate('author', 'name profilePicture');
        res.status(201).json(populatedPost);
    } catch (err) {
        console.error("Post creation error:", err);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name profilePicture').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId).populate('author', 'name profilePicture');

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error("Error fetching post by ID:", err);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};
exports.getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ author: userId }).populate('author', 'name profilePicture');

        if (!posts.length) {
            return res.status(404).json({ error: 'No posts found for this user' });
        }

        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts by user ID:", err);
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
};

// Fetch all posts created by the logged-in user
exports.getMyPosts = async (req, res) => {
    try {
        const myPosts = await Post.find({ author: req.user.id })
            .populate('author', 'name profilePicture')
            .sort({ createdAt: -1 });

        res.json(myPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch your posts' });
    }
};
