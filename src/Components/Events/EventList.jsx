import React, { useState } from 'react';
import EventCard from './EventCard';
import './EventList.css';

const sampleEvents = [
    {
        name: 'Birthday',
        date: '2024-12-20',
        time: '6:00 PM',
        location: 'Home Garden, NY',
        description: 'A fun-filled birthday celebration with games, cake, and music!',
        image: 'https://via.placeholder.com/150?text=No+Image',
    },
    {
        name: 'Anniversary',
        date: '2025-01-10',
        time: '8:00 PM',
        location: 'Riverside Restaurant, CA',
        description: 'Celebrating 10 years of togetherness with dinner and music.',
        image: 'https://via.placeholder.com/150/ADD8E6/000000?text=💍',
    },
    {
        name: 'Graduation',
        date: '2025-07-05',
        time: '11:00 AM',
        location: 'City Auditorium, TX',
        description: 'A proud moment marking academic success and new beginnings.',
        image: 'https://via.placeholder.com/150/90EE90/000000?text=🎓',
    },
    {
        name: 'Conference',
        date: '2025-08-15',
        time: '9:00 AM',
        location: 'Tech Hub, SF',
        description: 'An annual tech conference with speakers, workshops, and networking.',
        image: 'https://via.placeholder.com/150/D3D3D3/000000?text=📅',
    },
];


function EventList() {
    const [events] = useState(sampleEvents);

    return (
        <div className='container'>
            <h2>Register now to attend our upcoming events</h2>

            <div className="event-list">

                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
}

export default EventList;
