// src/components/EventRegistrations/BookEvent.js
import React, { useState } from 'react';
import API from '../../api'; // ✅ Your custom axios instance

const BookEvent = ({ eventId }) => {
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleBooking = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await API.post(
                '/bookings',
                {
                    eventId,
                    numberOfSeats,
                    paymentStatus: 'paid',
                    transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookingSuccess(true);
            console.log('✅ Booking successful:', response.data);
        } catch (error) {
            console.error('❌ Booking failed:', error.response?.data || error.message);
            alert('❌ Booking failed.');
        }
    };

    return (
        <div className="book-event-form">
            {bookingSuccess ? (
                <p className="success-msg">✅ Booking successful!</p>
            ) : (
                <>
                    <label>Seats:</label>
                    <input
                        type="number"
                        value={numberOfSeats}
                        onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                        min={1}
                    />
                    <button onClick={handleBooking}>Confirm Booking</button>
                </>
            )}
        </div>
    );
};

export default BookEvent;
