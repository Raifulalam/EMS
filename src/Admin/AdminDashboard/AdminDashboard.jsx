import React from 'react';
import './AdminDashboard.css';
import DashboardCard from './DashboardCard';
import AdminHeader from '../Header';
function AdminDashboard() {
    const stats = [
        { title: 'Total Events', count: 42, color: '#4caf50' },
        { title: 'Registered Users', count: 187, color: '#2196f3' },
        { title: 'Upcoming Events', count: 12, color: '#ff9800' },
        { title: 'Revenue', count: '$4,250', color: '#9c27b0' }
    ];

    return (
        <div className="admin-dashboard">
            <AdminHeader />
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Manage Events</li>
                    <li>Users</li>
                    <li>Reports</li>
                    <li>Settings</li>
                </ul>
            </aside>
            <main className="dashboard-main">
                <h1>Welcome, Admin</h1>
                <div className="cards">
                    {stats.map((item, index) => (
                        <DashboardCard
                            key={index}
                            title={item.title}
                            count={item.count}
                            color={item.color}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
