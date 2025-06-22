import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
function Header() {
    return (
        <div className="headerContainer">
            <div className="header">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default Header;
