import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EsewaPaymentForm = () => {
    const { state } = useLocation();
    const {
        amount: passedAmount,
        restaurant,
        userDetails,
        selectedTable,
        selectedTimeslot,
    } = state || {};
    console.log('Restaurant:', restaurant);
    console.log('User:', userDetails);
    console.log('Table:', selectedTable);
    console.log('Timeslot:', selectedTimeslot);

    const [amount, setAmount] = useState(500);
    const [taxAmount, setTaxAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(500);
    const [transactionUuid, setTransactionUuid] = useState(Date.now());
    const [productCode, setProductCode] = useState('EPAYTEST');
    const [productServiceCharge, setProductServiceCharge] = useState(0);
    const [productDeliveryCharge, setProductDeliveryCharge] = useState(0);
    const [successUrl, setSuccessUrl] = useState('https://mini-project-ii-6.onrender.com/complete-payment');
    const [failureUrl, setFailureUrl] = useState('https://developer.esewa.com.np/failure');
    const [signedFieldNames, setSignedFieldNames] = useState('total_amount,transaction_uuid,product_code');
    const [signature, setSignature] = useState('');

    useEffect(() => {
        // Fetch the signature and signed fields from the backend when component mounts or any of the dependencies change
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

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                // Try to parse the response body as JSON
                const data = await res.json();

                if (data.success) {
                    setSignature(data.signature);
                    setSignedFieldNames(data.signed_field_names);
                } else {
                    // Handle case where response is not successful
                    alert('Error fetching signature!');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('There was an error fetching the signature!');
            }
        };


        fetchSignature();
    }, [totalAmount, transactionUuid]);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Additional validation if needed

        // Submit the form to eSewa
        document.getElementById('esewa-form').submit();
    };

    return (
        <div>
            <h2>eSewa Payment Form</h2>
            <div className="payment-container">
                <h3>Payment Summary</h3>
                <div className="payment-summary">

                    <p><strong>Customer:</strong> {userDetails?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {userDetails?.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {userDetails?.phone || 'N/A'}</p>
                    <p><strong>Restaurant:</strong> {restaurant?.name || 'N/A'}</p>
                    <p><strong>Table:</strong> {selectedTable || 'N/A'}</p>
                    <p><strong>Time Slot:</strong> {selectedTimeslot || 'N/A'}</p>
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
