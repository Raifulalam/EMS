const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const crypto = require('crypto');

require('dotenv').config();

const { getEsewaPaymentHash, verifyEsewaPayment } = require("./Esewa");
const Payment = require('../models/paymentsModel');
const Booking = require("../models/booking");

// Initialize payment
Router.post("/initialize-esewa", async (req, res) => {
    try {
        const { bookingId, totalPrice } = req.body;

        if (!bookingId || !totalPrice) {
            return res.status(400).json({
                success: false,
                message: "Booking ID and total price are required.",
            });
        }

        // Validate booking exists and amount matches
        const bookingData = await Booking.findOne({
            _id: bookingId,
            price: Number(totalPrice),
        });

        if (!bookingData) {
            return res.status(400).json({
                success: false,
                message: "Booking not found or price mismatch.",
            });
        }

        // Initiate eSewa payment hash
        const paymentInitiate = await getEsewaPaymentHash({
            amount: totalPrice,
            transaction_uuid: bookingData._id,
        });

        res.json({
            success: true,
            payment: paymentInitiate,
            bookingData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Handle payment success callback

Router.get('/complete-payment', async (req, res) => {
    const { bookingId, data } = req.query;

    if (!data || !bookingId) {
        return res.status(400).json({
            success: false,
            message: "Missing bookingId or data in query params",
        });
    }

    try {
        const result = await verifyEsewaPayment(data);

        // Update your DB booking using bookingId here...

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            transaction: result.response,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during payment verification",
            error: error.message,
        });
    }
});






// Payment cancel or failure route
Router.get("/cancel-payment", async (req, res) => {
    const { bookingId } = req.query;

    try {
        await Booking.findByIdAndUpdate(bookingId, {
            $set: { status: "cancelled" },
        });

        res.redirect(`/payment-failed?bookingId=${bookingId}`);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cancel payment update failed.",
            error: error.message,
        });
    }
});

// Signature route
Router.post("/esewa-signature", (req, res) => {
    const { amount, transaction_uuid } = req.body;

    const product_code = process.env.ESEWA_PRODUCT_CODE;
    const secret_key = process.env.ESEWA_SECRET_KEY;

    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = crypto.createHmac("sha256", secret_key).update(data).digest("base64");

    res.json({
        success: true,
        signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
    });
});

module.exports = Router;
