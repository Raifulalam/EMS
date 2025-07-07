const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        phone: { type: Number, required: true },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },


    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
