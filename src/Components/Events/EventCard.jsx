import React, { useState } from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import BookEvent from './BookEvent'

function EventCard({ event }) {
    const [showBooking, setShowBooking] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="event-card">
            <img src={event.image || './public/pexels-teddy-2263436.jpg'} alt="Event" />
            <h4>{event.name}</h4>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Organized By:</strong> {event.organizer}</p>
            <p><strong>Price:</strong> ₹{event.price}</p>
            <p><strong>Description:</strong> {event.content}</p>
            <p><strong>Status:</strong> {event.status}</p>

            <button className='register-btn' onClick={() => setShowBooking(!showBooking)}>
                {showBooking ? 'Hide Booking' : 'Book Now'}
            </button>

            {showBooking && <BookEvent eventId={event._id} />}
        </div>
    );
}

export default EventCard;
