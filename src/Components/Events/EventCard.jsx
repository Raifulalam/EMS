import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import EventRegistrationComponent from './EventRegistrations/EventRegistration'
function EventCard({ event }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('./register-for-event')
    }
    return (
        <div className="event-card">

            <img src={event.image || 'https://via.placeholder.com/150'} alt="Event" />
            <h4>{event.name}</h4>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>

            <p><strong>Description:</strong> {event.content}</p>
            <p><strong>Status:</strong> {event.status}</p>
            <button className='register-btn' onClick={handleClick}>Register Now</button>

        </div>
    );
}

export default EventCard;
