const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assuming you have a User model
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true,
        min: 1
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled', 'attended'],
        default: 'booked'
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    transactionId: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
