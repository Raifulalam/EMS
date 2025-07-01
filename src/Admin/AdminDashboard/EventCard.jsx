import React from 'react';
import './EventCard.css';

function EventCard({ event, onEdit, onDelete }) {
    return (
        <div className="event-card">
            <img src={event.image || 'https://via.placeholder.com/150'} alt="Event" />
            <h3>{event.content}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Status:</strong> {event.status}</p>
            <div className="actions">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete} className="delete">Delete</button>
            </div>
        </div>
    );
}

export default EventCard;
