import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventForm({ onSuccess, eventData }) {
    const [form, setForm] = useState({
        name: '',
        image: '',
        date: '',
        time: '',
        content: '',
        location: '',
        status: 'upcoming'
    });

    useEffect(() => {
        if (eventData) {
            setForm({
                ...eventData,
                date: eventData.date?.split('T')[0] || '',
            });
        }
    }, [eventData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eventData) {
                await axios.put(`/api/events/${eventData._id}`, form);
            } else {
                await axios.post('/api/events', form);
            }
            onSuccess();
            setForm({ name: '', image: '', date: '', time: '', content: '', location: '', status: 'upcoming' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Creator ID" required />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <input name="time" value={form.time} onChange={handleChange} placeholder="Time" required />
            <input name="content" value={form.content} onChange={handleChange} placeholder="Description" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
            <select name="status" value={form.status} onChange={handleChange}>
                <option value="upcoming">Upcoming</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">{eventData ? 'Update' : 'Create'} Event</button>
        </form>
    );
}

export default EventForm;
