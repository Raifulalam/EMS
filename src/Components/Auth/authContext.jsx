// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import API from "../../api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                // Set token in Authorization header
                API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                const response = await API.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                // Optional: clear token if invalid
                localStorage.removeItem("token");
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
