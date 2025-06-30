const Comment = require('../models/Comments');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            post: req.params.postId,
            author: req.user,
            text: req.body.text
        });

        await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: comment._id } });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
