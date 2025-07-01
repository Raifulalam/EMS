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

const months = [
    { value: '', label: 'All Months' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const years = ['All Years', '2024', '2025'];

function EventList() {
    const [events] = useState(sampleEvents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const filteredEvents = events.filter((event) => {
        const matchName = event.name.toLowerCase().includes(searchTerm.toLowerCase());

        const [year, month] = event.date.split('-');

        const matchMonth = selectedMonth ? month === selectedMonth : true;
        const matchYear = selectedYear && selectedYear !== 'All Years' ? year === selectedYear : true;

        return matchName && matchMonth && matchYear;
    });

    return (
        <div className='container'>
            <h2>Register now to attend </h2>
            <h3>our upcoming events</h3>

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {months.map((m, idx) => (
                        <option key={idx} value={m.value}>{m.label}</option>
                    ))}
                </select>

                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    {years.map((y, idx) => (
                        <option key={idx} value={y === 'All Years' ? '' : y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Event List */}
            <div className="event-list">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))
                ) : (
                    <p>No events match your criteria.</p>
                )}
            </div>
        </div>
    );
}

export default EventList;
