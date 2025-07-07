import React, { useContext, useEffect, useState } from 'react';
import './AdminDashboard.css';
import DashboardCard from './DashboardCard';
import { UserContext } from '../../Components/Auth/authContext';
import { Navigate } from 'react-router-dom';
import API from '../../api';

function AdminDashboard() {
    const { user } = useContext(UserContext);
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get('/admin/stats');
                const data = res.data;

                setStats([
                    { title: 'Total Events', count: data.totalEvents, color: '#4caf50' },
                    { title: 'Registered Users', count: data.totalUsers, color: '#2196f3' },
                    { title: 'Upcoming Events', count: data.upcomingEvents, color: '#ff9800' },
                    { title: 'Revenue', count: `$${data.revenue}`, color: '#9c27b0' }
                ]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch dashboard statistics.');
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Don't return early; render <Navigate /> conditionally inside JSX
    return (
        <>
            {!user || user.role !== 'admin' ? (
                <Navigate to="/login" />
            ) : (
                <div className="admin-dashboard">
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
                        <h1>Welcome, {user.name}</h1>

                        {loading ? (
                            <p>Loading stats...</p>
                        ) : error ? (
                            <p className="error-msg">{error}</p>
                        ) : (
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
                        )}
                    </main>
                </div>
            )}
        </>
    );
}

export default AdminDashboard;
