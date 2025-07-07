
import React, { useEffect, useState } from 'react';
import API from '../../../api';
import './MyBookings.css'

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await API.get('/bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(res.data);
            } catch (error) {
                console.error('❌ Failed to fetch bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p>Loading bookings...</p>;

    return (
        <div className="my-bookings">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <strong>Event:</strong> {booking.event.name}<br />
                            <strong>Date:</strong> {new Date(booking.event.date).toLocaleDateString()}<br />
                            <strong>Seats:</strong> {booking.numberOfSeats}<br />
                            <strong>Status:</strong> {booking.paymentStatus}<br />
                            <strong>Transaction ID:</strong> {booking.transactionId}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyBookings;
