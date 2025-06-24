import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
    return (
        <div className="event-card">
            <img src={'/pexels-teddy-2263436.jpg'} alt={event.name} className="event-image" />
            <div className="event-details">
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
            </div>
            <button className='register-btn'>Register</button>
        </div>
    );
}

export default EventCard;
