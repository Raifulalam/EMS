import React, { useContext, useEffect, useState } from 'react';
import { CalendarDays, Users, DollarSign, TrendingUp, Trash2 } from 'lucide-react';
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
                    totalAttendees: "2K+",
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
    const handleCancelBooking = async (bookingId) => {
        try {
            await API.patch(`/bookings/${bookingId}/cancel`);
            setMyEvents(prev => prev.map(b =>
                b._id === bookingId ? { ...b, status: 'cancelled' } : b
            ));

        } catch (error) {
            console.error('Cancel failed:', error);

        }
    };

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
                    <div className="stat-card total-events">
                        <CalendarDays size={20} />
                        <div>
                            <h3>{stats.totalEvents}</h3>
                            <p>Total Events</p>
                        </div>
                    </div>
                    <div className="stat-card upcoming-events">
                        <CalendarDays size={20} />
                        <div>
                            <h3>{stats.upcomingEvents}</h3>
                            <p>Upcoming Events</p>
                        </div>
                    </div>
                    <div className="stat-card registered-events">
                        <Users size={20} />
                        <div>
                            <h3>{stats.registeredEvents}</h3>
                            <p>Registered Events</p>
                        </div>
                    </div>
                    <div className="stat-card attended-events">
                        <TrendingUp size={20} />
                        <div>
                            <h3>{stats.attendedEvents}</h3>
                            <p>Events Attended</p>
                        </div>
                    </div>
                    <div className="stat-card total-attendees">
                        <Users size={20} />
                        <div>
                            <h3>{stats.totalAttendees}</h3>
                            <p>Total Attendees (All Events)</p>
                        </div>
                    </div>
                    <div className="stat-card total-paid">
                        <DollarSign size={20} />
                        <div>
                            <h3>₹{stats.revenue}</h3>
                            <p>Total Paid</p>
                        </div>
                    </div>
                </section>


                <section className="activity-events">
                    {/* Left Column - Active Bookings */}
                    <div className="events-column">
                        <h4>📅 My Registered Events</h4>
                        <h5>✅ Active Bookings</h5>
                        <div className="scrollable-list">
                            <ul className="event-list">
                                {myEvents.filter(ev => ev.status !== 'cancelled').length === 0 && <li>No active bookings.</li>}
                                {myEvents
                                    .filter(ev => ev.status !== 'cancelled')
                                    .map((booking, i) => (
                                        <li key={i} className="event-item">
                                            <div className="event-header">
                                                <strong className="event-title">{booking.event?.name || 'Untitled'}</strong>
                                                <Trash2
                                                    size={18}
                                                    className="delete-icon"
                                                    title="Cancel Booking"
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                />
                                            </div>
                                            <p className="event-details">
                                                {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'N/A'} •{' '}
                                                {booking.event?.time || ''} • {booking.event?.location || ''}
                                            </p>
                                            <small className="event-meta">
                                                Status: <span className={`status ${booking.status}`}>{booking.status || 'confirmed'}</span> • Paid: ₹{booking.amount || 0}
                                            </small>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Cancelled Bookings */}
                    <div className="notify-column">
                        <h4>❌ Cancelled Bookings</h4>
                        <div className="scrollable-list">
                            <ul className="event-list">
                                {myEvents.filter(ev => ev.status === 'cancelled').length === 0 && <li>No cancelled bookings.</li>}
                                {myEvents
                                    .filter(ev => ev.status === 'cancelled')
                                    .map((booking, i) => (
                                        <li key={i} className="event-item cancelled">
                                            <strong className="event-title">{booking.event?.name || 'Untitled'}</strong>
                                            <p className="event-details">
                                                {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'N/A'} •{' '}
                                                {booking.event?.time || ''} • {booking.event?.location || ''}
                                            </p>
                                            <small className="event-meta">
                                                Status: <span className="status cancelled">cancelled</span> • Paid: ₹{booking.amount || 0}
                                            </small>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </section>




            </main>
        </div>
    );
};

export default UserDashboard;
