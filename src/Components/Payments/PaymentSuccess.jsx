import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../api';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingId = new URLSearchParams(location.search).get('bookingId');

    useEffect(() => {
        if (bookingId) {
            // Call backend to complete payment and update status
            API.post(`/complete-payment`, { bookingId })
                .then(() => {
                    toast.success('Payment successful! Booking confirmed.');
                    setTimeout(() => navigate('/booking-history'), 3000);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Error completing payment!');
                });
        }
    }, [bookingId]);

    return (
        <div className="payment-page">
            <h2>🎉 Payment Successful</h2>
            <p>Thank you! Your booking has been confirmed.</p>
        </div>
    );
};

export default PaymentSuccess;
