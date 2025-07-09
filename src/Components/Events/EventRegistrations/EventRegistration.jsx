import React, { useContext, useState } from 'react';
import './EventRegistration.css';
import { UserContext } from '../../Auth/authContext';
import API from '../../../api';

const EventRegistrationModal = ({ eventId, isOpen, onClose }) => {
    const { user } = useContext(UserContext);
    const [eventName, setEventName] = useState('');
    const [guestCount, setGuestCount] = useState(1);
    const [notes, setNotes] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventId) return alert('❌ Event ID missing');

        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            const transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;

            await API.post(
                '/bookings',
                {
                    eventId,
                    numberOfSeats: guestCount,
                    paymentStatus: 'paid',
                    transactionId
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setBookingSuccess(true);
        } catch (error) {
            console.error('❌ Booking failed:', error.response?.data || error.message);
            alert('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>

                {bookingSuccess ? (
                    <p className="success-msg">🎉 Booking successful!</p>
                ) : (
                    <>
                        <h2>Register for Event</h2>
                        <p>Your details are pre-filled. Just confirm the info below.</p>

                        <form onSubmit={handleSubmit} className="registration-form">
                            <label>Full Name</label>
                            <input type="text" value={user?.name || ''} disabled />

                            <label>Email</label>
                            <input type="email" value={user?.email || ''} disabled />

                            <label>Phone</label>
                            <input type="tel" value={user?.phone || ''} disabled />


                            <label>Number of Guests</label>
                            <input
                                type="number"
                                value={guestCount}
                                min="1"
                                onChange={(e) => setGuestCount(Number(e.target.value))}
                                required
                            />

                            <label>Additional Notes</label>
                            <textarea
                                value={notes}
                                placeholder="Any notes or requests?"
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>

                            <button type="submit" className="register-button" disabled={loading}>
                                {loading ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventRegistrationModal;
