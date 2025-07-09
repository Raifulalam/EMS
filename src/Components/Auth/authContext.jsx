// authContext.js
import React, { createContext, useState, useEffect } from 'react';
import API from '../../api';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await API.get('/auth/me');
                setUser(res.data);
            } catch (err) {
                console.error('Auth fetch error:', err);
            }
        };

        fetchUser();
    }, []); // only runs once on mount

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
