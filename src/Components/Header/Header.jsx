import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="headerContainer">
            <div className="header">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/event-list">Events List</Link>
                <Link to="/filter-event">Find Events</Link>
                <Link to="/logout">Logout</Link>
            </div>
        </div>
    );
}

export default Header;
