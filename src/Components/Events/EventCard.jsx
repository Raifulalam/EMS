import React, { useState } from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import EventRegistrationModal from './EventRegistrations/EventRegistration';

function EventCard({ event }) {
    const [showBooking, setShowBooking] = useState(false);
    const navigate = useNavigate();

    const isUpcoming = event.status?.toLowerCase() === 'upcoming';

    return (
        <div className="event-card">
            <img src={event.image || '/pexels-teddy-2263436.jpg'} alt="Event" />
            <h4>{event.name}</h4>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Organized By:</strong> {event.organizer}</p>
            <p><strong>Price:</strong> ₹{event.price}</p>
            <p><strong>Description:</strong> {event.content}</p>
            <p><strong>Status:</strong> {event.status}</p>

            {isUpcoming ? (
                <>
                    <button className='register-btn' onClick={() => setShowBooking(true)}>
                        Book Now
                    </button>

                    <EventRegistrationModal
                        eventId={event._id}
                        price={event.price}
                        isOpen={showBooking}
                        onClose={() => setShowBooking(false)}
                    />
                </>
            ) : (
                <div className="ended-badge">🚫 Event Ended</div>
            )}
        </div>
    );
}

export default EventCard;
