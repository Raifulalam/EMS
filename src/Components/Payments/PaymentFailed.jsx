import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentFailed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error('Payment failed. Please try again.');
    }, []);

    return (
        <div className="payment-page">
            <h2>❌ Payment Failed</h2>
            <p>Your payment was not completed. Please try again or contact support.</p>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default PaymentFailed;
