const Payment = require('../models/Payment');
const Booking = require('../models/booking');

// Handles successful payment and updates both Payment & Booking
exports.completePayment = async (req, res) => {
    try {
        const {
            transactionId,
            pidx,
            bookingId,
            amount,
            dataFromVerificationReq,
            apiQueryFromUser,
            paymentGateway,
        } = req.body;

        // Check if booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Create a payment record
        const payment = await Payment.create({
            transactionId,
            pidx,
            booking: bookingId,
            amount,
            dataFromVerificationReq,
            apiQueryFromUser,
            paymentGateway,
            status: "success", // assuming success at this point
        });

        // Update booking payment status to 'paid'
        booking.paymentStatus = 'paid';
        await booking.save();

        res.status(201).json({
            success: true,
            message: "Payment completed successfully",
            payment,
        });
    } catch (error) {
        console.error("Payment completion error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during payment completion",
            error: error.message,
        });
    }
};
exports.cancelPayment = async (req, res) => {
    const { bookingId, reason } = req.body;

    try {
        // Update payment status if needed (optional logic)
        // Update booking status
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        booking.paymentStatus = 'unpaid';
        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Payment/booking cancelled",
            booking,
        });
    } catch (err) {
        console.error("Cancel payment error:", err);
        res.status(500).json({
            success: false,
            message: "Error cancelling payment/booking",
            error: err.message,
        });
    }
};
