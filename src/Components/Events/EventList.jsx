import React, { useState } from 'react';
import EventCard from './EventCard';
import './EventList.css';
import API from '../../api';
import { useEffect } from 'react';



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
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchEvents = async () => {
        try {
            const res = await API.get('/events/getEvent');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);
    const filteredEvents = events.filter((event) => {
        const matchName = event.name.toLowerCase().includes(searchTerm.toLowerCase());

        const [year, month] = event.date.split('-');

        const matchMonth = selectedMonth ? month === selectedMonth : true;
        const matchYear = selectedYear && selectedYear !== 'All Years' ? year === selectedYear : true;

        return matchName && matchMonth && matchYear;
    });

    return (
        <div className='container'>
            <h2>Register now to attend our upcoming events</h2>


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
