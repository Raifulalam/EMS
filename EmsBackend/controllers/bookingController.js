const Booking = require('../models/booking')
const Event = require('../models/Event');


// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { eventId, numberOfSeats, paymentStatus, price } = req.body;

        // Check if req.user is attached properly
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: user not found in request' });
        }

        const userId = req.user._id;

        // Validate required fields
        if (!eventId || !numberOfSeats || !paymentStatus || !price) {
            return res.status(400).json({ message: 'Missing required booking fields' });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const booking = new Booking({
            event: eventId,
            user: userId,
            numberOfSeats,
            paymentStatus,
            price
        });

        await booking.save();
        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: 'Booking failed', error });
    }
};


// Get all bookings for current user
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('event')
            .sort({ bookingDate: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await Booking.findOneAndUpdate(
            { _id: bookingId, user: req.user._id },
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) return res.status(404).json({ message: 'Booking not found or unauthorized' });

        res.status(200).json({ message: 'Booking cancelled', booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel booking', error });
    }
};
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('event')
            .populate('user');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, booking });
    } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};