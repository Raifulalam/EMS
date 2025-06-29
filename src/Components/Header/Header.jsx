import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="headerContainer">
            <div className="logo">EventEase</div>
            <nav className="navLinks">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/event-list">Events</Link>
                <Link to="/logout">Logout</Link>
            </nav>
        </header>
    );
}

export default Header;
