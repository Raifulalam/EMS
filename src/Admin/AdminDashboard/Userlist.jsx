import React, { useEffect, useState } from 'react';
import './UserList.css';
import API from '../../api';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.get('/auth/users')
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load users');
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="info-msg">Loading...</p>;
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <div className="user-list">
            <h2>User List</h2>
            {users.map((user) => (
                <div className="user-card" key={user.id}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                </div>
            ))}
        </div>
    );
}

export default UserList;
