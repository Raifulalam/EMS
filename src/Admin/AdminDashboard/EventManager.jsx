import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import EventForm from './EventForm';
import './AdminEventManager.css';
import API from '../../api';

function AdminEventManager() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [refresh, setRefresh] = useState(false);

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
    }, [refresh]);

    const handleEdit = (event) => {
        setSelectedEvent(event);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`/api/events/${id}`);
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormSuccess = () => {
        setSelectedEvent(null);
        setRefresh(!refresh);
    };

    return (
        <div className="admin-event-manager">
            <h2>Manage Events</h2>
            <EventForm onSuccess={handleFormSuccess} eventData={selectedEvent} />
            <div className="event-list">
                {events.map(event => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onEdit={() => handleEdit(event)}
                        onDelete={() => handleDelete(event._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminEventManager;
