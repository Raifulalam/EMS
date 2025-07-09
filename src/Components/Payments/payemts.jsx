import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EsewaPaymentForm.css'
const EsewaPaymentForm = () => {
    const { state } = useLocation();

    const {
        eventId,
        eventName,
        userId,
        bookingId,
        amount: passedAmount,
        guestCount
    } = state || {};

    const [amount] = useState(passedAmount || 0);
    const [taxAmount] = useState(0);
    const [totalAmount] = useState(passedAmount || 0);
    const [transactionUuid] = useState(Date.now().toString());
    const [productCode] = useState('EPAYTEST');
    const [productServiceCharge] = useState(0);
    const [productDeliveryCharge] = useState(0);
    const [successUrl] = useState('https://mini-project-ii-6.onrender.com/complete-payment');
    const [failureUrl] = useState('https://developer.esewa.com.np/failure');
    const [signedFieldNames, setSignedFieldNames] = useState('total_amount,transaction_uuid,product_code');
    const [signature, setSignature] = useState('');

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const res = await fetch('https://mini-project-ii-6.onrender.com/api/esewa-signature', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: totalAmount,
                        transaction_uuid: transactionUuid,
                    }),
                });

                const data = await res.json();

                if (data.success) {
                    setSignature(data.signature);
                    setSignedFieldNames(data.signed_field_names);
                } else {
                    alert('Error fetching signature!');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('There was an error fetching the signature!');
            }
        };

        fetchSignature();
    }, [totalAmount, transactionUuid]);

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById('esewa-form').submit();
    };

    return (
        <div>
            <h2>eSewa Payment Form</h2>
            <div className="payment-container">
                <h3>Payment Summary</h3>
                <div className="payment-summary">
                    <p><strong>Booking ID:</strong> {bookingId}</p>
                    <p><strong>Event:</strong> {eventName}</p>
                    <p><strong>Guests:</strong> {guestCount}</p>
                    <p><strong>Total Amount:</strong> NPR {totalAmount}</p>
                </div>

                <form
                    id="esewa-form"
                    className="esewa-form"
                    action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                    method="POST"
                    target="_blank"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="amount" value={amount} />
                    <input type="hidden" name="tax_amount" value={taxAmount} />
                    <input type="hidden" name="total_amount" value={totalAmount} />
                    <input type="hidden" name="transaction_uuid" value={transactionUuid} />
                    <input type="hidden" name="product_code" value={productCode} />
                    <input type="hidden" name="product_service_charge" value={productServiceCharge} />
                    <input type="hidden" name="product_delivery_charge" value={productDeliveryCharge} />
                    <input type="hidden" name="success_url" value={successUrl} />
                    <input type="hidden" name="failure_url" value={failureUrl} />
                    <input type="hidden" name="signed_field_names" value={signedFieldNames} />
                    <input type="hidden" name="signature" value={signature} />

                    <button type="submit" className="esewa-pay-btn">Pay with eSewa</button>
                </form>
            </div>
        </div>
    );
};

export default EsewaPaymentForm;
