const axios = require("axios");


const crypto = require("crypto");

async function getEsewaPaymentHash({ amount, transaction_uuid }) {
    const product_code = process.env.ESEWA_PRODUCT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;

    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(data)
        .digest("base64");

    return {
        total_amount: amount,
        transaction_uuid,
        product_code,
        signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
    };
}
async function verifyEsewaPayment(encodedData) {
    try {
        // Decode base64 encoded string
        let decodedData = Buffer.from(encodedData, 'base64').toString('utf8');
        decodedData = JSON.parse(decodedData);

        const secretKey = process.env.ESEWA_SECRET_KEY;
        const product_code = process.env.ESEWA_PRODUCT_CODE;

        const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${product_code}`;

        const expectedSignature = crypto
            .createHmac("sha256", secretKey)
            .update(data)
            .digest("base64");

        if (expectedSignature !== decodedData.signature) {
            throw new Error("Invalid payload signature.");
        }

        // Final verification from eSewa API
        const verificationUrl = `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${product_code}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`;

        const response = await axios.get(verificationUrl, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (
            response.data.status !== "COMPLETE" ||
            response.data.transaction_uuid !== decodedData.transaction_uuid ||
            Number(response.data.total_amount) !== Number(decodedData.total_amount)
        ) {
            throw new Error("Payment verification failed.");
        }

        return { response: response.data, decodedData };
    } catch (error) {
        throw error;
    }
}
module.exports = { verifyEsewaPayment, getEsewaPaymentHash };