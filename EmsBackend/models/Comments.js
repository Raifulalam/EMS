const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
