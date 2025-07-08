import React, { useContext, useEffect, useState } from 'react';
import { CalendarDays, Users, DollarSign, TrendingUp } from 'lucide-react';
import './Dashboard.css';
import API from '../../api';
import { UserContext } from '../Auth/authContext';

const UserDashboard = () => {
    const { user } = useContext(UserContext);
    const [allEvents, setAllEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [stats, setStats] = useState({
        totalEvents: 0,
        upcomingEvents: 0,
        registeredEvents: 0,
        attendedEvents: 0,
        totalAttendees: 0,
        revenue: 0,
        conversionRate: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, registeredRes] = await Promise.all([
                    API.get('/events/getEvent'),
                    API.get('/bookings')
                ]);

                const all = eventsRes.data;
                const mine = registeredRes.data;
                console.log(user)

                setAllEvents(all);
                setMyEvents(mine);

                const now = new Date();

                setStats({
                    totalEvents: all.length,
                    upcomingEvents: all.filter(ev => new Date(ev.date) > now).length,
                    registeredEvents: mine.length,
                    attendedEvents: mine.filter(ev => ev.status === 'attended').length,
                    totalAttendees: all.reduce((acc, ev) => acc + (ev.attendees || 0), 0),
                    revenue: mine.reduce((acc, ev) => acc + (ev.amount || 0), 0),
                    conversionRate: all.length ? ((mine.length / all.length) * 100).toFixed(1) : 0
                });
            } catch (error) {
                console.error('Dashboard error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2 className="logo">🎉 My Events</h2>
                <nav>
                    <ul>
                        <li className="active">Dashboard</li>
                        <li>My Registered Events</li>
                        <li>My Payments</li>
                        <li>Profile</li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <input type="text" placeholder="Search events..." />
                    <div className="user-info">
                        <span className="name">{user?.name || 'User'}</span>
                        <span className="role">{user?.role === 'user' ? 'Attendee' : user?.role}</span>
                    </div>
                </header>

                <section className="stats">
                    <div className="stat-card">
                        <CalendarDays size={20} />
                        <div>
                            <h3>{stats.totalEvents}</h3>
                            <p>Total Events</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <CalendarDays size={20} />
                        <div>
                            <h3>{stats.upcomingEvents}</h3>
                            <p>Upcoming Events</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Users size={20} />
                        <div>
                            <h3>{stats.registeredEvents}</h3>
                            <p>Registered Events</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <TrendingUp size={20} />
                        <div>
                            <h3>{stats.attendedEvents}</h3>
                            <p>Events Attended</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Users size={20} />
                        <div>
                            <h3>{stats.totalAttendees}</h3>
                            <p>Total Attendees (All Events)</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <DollarSign size={20} />
                        <div>
                            <h3>₹{stats.revenue}</h3>
                            <p>Total Paid</p>
                        </div>
                    </div>
                </section>

                <section className="activity-events">
                    <div className="upcoming">
                        <h4>My Registered Events</h4>
                        <ul>
                            {myEvents.slice(0, 4).map((event, i) => (
                                <li key={i}>
                                    <strong>{event.title}</strong>
                                    <p>{event.date} • {event.time} • {event.location}</p>
                                    <small>Status: {event.status} • Paid: ₹{event.amount || '0'}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
