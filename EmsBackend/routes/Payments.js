const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const crypto = require('crypto');

require('dotenv').config();

const { getEsewaPaymentHash, verifyEsewaPayment } = require("./Esewa");
const Payment = require('../models/paymentsModel')
const Item = require("../model/itemModel");
const PurchasedItem = require("../model/purchasedModel");
Router.post("/initialize-esewa", async (req, res) => {
    try {
        const { itemId, totalPrice } = req.body;

        if (!itemId || !totalPrice) {
            return res.status(400).send({
                success: false,
                message: "ItemId and TotalPrice are required.",
            });
        }

        // Validate item exists and price matches
        const itemData = await Item.findOne({
            _id: itemId,
            price: Number(totalPrice),
        });

        if (!itemData) {
            return res.status(400).send({
                success: false,
                message: "Item not found or price mismatch.",
            });
        }

        // Create a record for the purchase
        const purchasedItemData = await PurchasedItem.create({
            item: itemId,
            paymentMethod: "esewa",
            totalPrice: totalPrice,
        });

        // Initiate payment with eSewa
        const paymentInitiate = await getEsewaPaymentHash({
            amount: totalPrice,
            transaction_uuid: purchasedItemData._id,
        });

        // Respond with payment details
        res.json({
            success: true,
            payment: paymentInitiate,
            purchasedItemData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// GET route to complete payment
Router.get("/complete-payment", async (req, res) => {
    const { data } = req.query; // Data received from eSewa's redirect

    try {
        // Verify payment with eSewa
        const paymentInfo = await verifyEsewaPayment(data);

        // Find the purchased item using the transaction UUID
        const purchasedItemData = await PurchasedItem.findById(
            paymentInfo.response.transaction_uuid
        );

        if (!purchasedItemData) {
            return res.status(500).json({
                success: false,
                message: "Purchase not found",
            });
        }

        // Create a new payment record in the database
        const paymentData = await Payment.create({
            pidx: paymentInfo.decodedData.transaction_code,
            transactionId: paymentInfo.decodedData.transaction_code,
            productId: paymentInfo.response.transaction_uuid,
            amount: purchasedItemData.totalPrice,
            dataFromVerificationReq: paymentInfo,
            apiQueryFromUser: req.query,
            paymentGateway: "esewa",
            status: "success",
        });

        // Update the purchased item status to 'completed'
        await PurchasedItem.findByIdAndUpdate(
            paymentInfo.response.transaction_uuid,
            { $set: { status: "completed" } }
        );

        // Respond with success message
        res.json({
            success: true,
            message: "Payment successful",
            paymentData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during payment verification",
            error: error.message,
        });
    }
});

// Route to create a test item
Router.get("/create-item", async (req, res) => {
    let itemData = await Item.create({
        name: "Headphone",
        price: 500,
        inStock: true,
        category: "vayo pardaina",
    });
    res.json({
        success: true,
        item: itemData,
    });
});
// Route to get signed hash and required values


Router.post("/esewa-signature", (req, res) => {
    const { amount, transaction_uuid } = req.body;

    const product_code = process.env.ESEWA_PRODUCT_CODE;
    const secret_key = process.env.ESEWA_SECRET_KEY;

    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = crypto.createHmac("sha256", secret_key).update(data).digest("base64");

    res.json({
        success: true,
        signature,
        signed_field_names: "total_amount,transaction_uuid,product_code"
    });
});


module.exports = Router;

