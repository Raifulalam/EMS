import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EsewaPaymentForm.css';
import API from '../../api';

const EsewaPaymentForm = () => {
    const location = useLocation();
    const { state } = location;

    const [bookingId, setBookingId] = useState(state?.bookingId || '');
    const [amount, setAmount] = useState(state?.amount || 0);
    const [guestCount, setGuestCount] = useState(state?.guestCount || '');
    const [eventName, setEventName] = useState(state?.eventName || '');
    const [userId, setUserId] = useState(state?.userId || '');
    const [loading, setLoading] = useState(true);

    // Fallback to query params
    useEffect(() => {
        if (!state) {
            const queryParams = new URLSearchParams(location.search);
            setBookingId(queryParams.get('bookingId') || '');
            setAmount(queryParams.get('amount') || 0);
            setGuestCount(queryParams.get('guest') || '');
            setEventName(queryParams.get('event') || '');
        }
    }, [location.search, state]);





    const [taxAmount] = useState(0);
    const [transactionUuid] = useState(Date.now().toString());
    const [productCode] = useState('EPAYTEST');
    const [productServiceCharge] = useState(0);
    const [productDeliveryCharge] = useState(0);
    const [successUrl] = useState(`https://mini-project-ii-6.onrender.com/complete-payment?bookingId=${bookingId}`);
    const [failureUrl] = useState('https://mini-project-ii-6.onrender.com/payment-failed');
    const [signedFieldNames, setSignedFieldNames] = useState('total_amount,transaction_uuid,product_code');
    const [signature, setSignature] = useState('');

    // Fetch eSewa signature
    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const res = await fetch('https://mini-project-ii-6.onrender.com/api/esewa-signature', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount,
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
            } finally {
                setLoading(false);
            }
        };

        fetchSignature();
    }, [amount, transactionUuid]);

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById('esewa-form').submit();
    };

    if (loading) {
        return <div className="loader">Preparing payment...</div>;
    }

    return (
        <div>
            <h2>eSewa Payment</h2>
            <div className="payment-container">
                <h3>Payment Summary</h3>
                <div className="payment-summary">
                    <p><strong>Booking ID:</strong> {bookingId}</p>
                    <p><strong>Event:</strong> {eventName}</p>
                    <p><strong>Guests:</strong> {guestCount}</p>
                    <p><strong>Amount:</strong> NPR {amount}</p>
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
                    <input type="hidden" name="total_amount" value={amount} />
                    <input type="hidden" name="transaction_uuid" value={transactionUuid} />
                    <input type="hidden" name="product_code" value={productCode} />
                    <input type="hidden" name="product_service_charge" value={productServiceCharge} />
                    <input type="hidden" name="product_delivery_charge" value={productDeliveryCharge} />
                    <input type="hidden" name="success_url" value={successUrl} />
                    <input type="hidden" name="failure_url" value={failureUrl} />
                    <input type="hidden" name="signed_field_names" value={signedFieldNames} />
                    <input type="hidden" name="signature" value={signature} />

                    <button type="submit" className="esewa-pay-btn" disabled={!signature}>
                        {signature ? 'Pay with eSewa' : 'Loading...'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EsewaPaymentForm;
