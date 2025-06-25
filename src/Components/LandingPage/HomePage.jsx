import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to EventEase</h1>
                <p>Your one-stop solution for managing and attending events.</p>
                <div className="home-buttons">
                    <Link to="/event-list" className="home-btn">View Events</Link>
                    <Link to="/register-event" className="home-btn">Register for Event</Link>
                    <Link to="/login" className="home-btn secondary">Login</Link>
                </div>
            </header>

            <section className="features-section">
                <h2>Why Choose EventEase?</h2>
                <div className="features">
                    <div className="feature-card">
                        <h3>Easy Registration</h3>
                        <p>Sign up for events with a few simple steps.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Event Discovery</h3>
                        <p>Find the best events that match your interests.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Secure Payments</h3>
                        <p>Make hassle-free payments through trusted gateways.</p>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <p>&copy; 2025 Event Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
