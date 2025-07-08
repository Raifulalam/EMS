import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = localStorage.getItem('token');
    return (

        <header className="headerContainer">
            <div className="logo">EventEase</div>
            <nav className="navLinks">

                {
                    isLoggedIn ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/event-list">Events</Link>

                            <Link to="/my-bookings">My Bookings</Link>
                            <Link onClick={handleLogout}>Logout</Link>

                        </>
                    ) : (
                        <>

                            <Link to="/">Home</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )
                }


            </nav>
        </header>
    );
}

export default Header;
