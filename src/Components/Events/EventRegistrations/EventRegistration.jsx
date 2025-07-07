import React, { useContext, useState } from 'react';
import './EventRegistration.css';
import { UserContext } from '../../Auth/authContext';

function EventRegistrationComponent() {
    const user = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [eventName, setEventName] = useState("");
    const [guestCount, setGuestCount] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Event:", eventName);
        console.log("Guest Count:", guestCount);
        console.log("Notes:", notes);
        alert("Event registration submitted!");
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2 className="event-title">Event Registration</h2>
                <p className="event-subtitle">Fill the form below to register for the event.</p>

                <form onSubmit={handleSubmit} className="registration-form">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <label>Event Name</label>
                    <input
                        type="text"
                        placeholder="Which event are you attending?"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />

                    <label>Number of Guests</label>
                    <input
                        type="number"
                        placeholder="Guests (including you)"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        required
                    />

                    <label>Additional Notes</label>
                    <textarea
                        placeholder="Any special requests or notes?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>

                    <button type="submit" className="register-button">Submit Registration</button>
                </form>

                <a href="/login" className="pay-link">Already registered? Click to Pay</a>
            </div>
        </div>
    );
}

export default EventRegistrationComponent;
