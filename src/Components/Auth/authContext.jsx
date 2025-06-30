// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";


import API from "../../api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get("/auth/me");
                setUser(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
