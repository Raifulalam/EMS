import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.css';

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload(); // optional: force reload to clear context
    };

    return (
        <header className="admin-header">
            <div className="logo">EventEase Admin</div>
            <nav className="admin-nav">
                <Link to="/admin-dashboard">Dashboard</Link>
                <Link to="/admin/events">Manage Events</Link>
                <Link to="/admin/users">Users</Link>
                {/* <Link to="/admin/reports">Reports  </Link> */}
                <button className="logout" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}

export default AdminHeader;
