const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    date: { type: Date, required: true },
    time: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    price: { type: Number, required: true },

    status: {
        type: String,
        enum: ['upcoming', 'expired', 'cancelled', 'completed'],
        default: 'upcoming',
    },

});

module.exports = mongoose.model('Event', eventSchema);
