import React, { useState, useEffect, useContext } from 'react';
import './EventForm.css';
import { UserContext } from '../../Components/Auth/authContext';
import API from '../../api';

function EventForm({ onSuccess, eventData }) {
    const user = useContext(UserContext);

    const [form, setForm] = useState({
        name: '',
        image: '',
        date: '',
        time: '',
        content: '',
        location: '',
        status: 'upcoming',
        organizer: '',
        price: ''
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
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const dataToSend = {
            ...form
        };

        try {
            console.log("Submitting event:", dataToSend);
            if (eventData) {
                await API.put(`/events/${eventData._id}`, dataToSend);
            } else {
                await API.post('/events/create', dataToSend);
            }
            onSuccess();
            setForm({
                name: '',
                image: '',
                date: '',
                time: '',
                content: '',
                location: '',
                status: 'upcoming',
                organizer: '',
                price: '',
            });
        } catch (err) {
            if (err.response) {
                console.error("Server error:", err.response.data);
            } else {
                console.error("Submission failed:", err.message);
            }
        }
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Event Name" required />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <input name="time" value={form.time} onChange={handleChange} placeholder="Time (e.g., 6:00 PM)" required />
            <input name="content" value={form.content} onChange={handleChange} placeholder="Description" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
            <input name="organizer" value={form.organizer} onChange={handleChange} placeholder="Organizer" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
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
