import axios from 'axios';

const API = axios.create({
    baseURL: 'https://ems-2iis.onrender.com/api',
});

// Automatically attach token to every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Handle global 401 errors (e.g., redirect to login)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // or navigate('/login') if using react-router
        }
        return Promise.reject(error);
    }
);

export default API;
