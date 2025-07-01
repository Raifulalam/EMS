import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { UserContext } from '../Auth/authContext'

function LoginComponents() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);

            // Fetch user data after login
            const userRes = await API.get('/auth/me');
            setUser(userRes.data);

            // Redirect based on user role
            if (userRes.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRes.data.role === 'user') {
                navigate('/user-dashboard'); // or home `/`
            } else {
                alert('Unknown role');
            }

        } catch (err) {
            console.error(err);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login_container">
            <div className="loginPage">
                <h2>Welcome Back</h2>
                <p>Please enter your details to login</p>
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <p>Don't have an account? <a href="/signup">Create now</a></p>
            </div>
        </div>
    );
}

export default LoginComponents;
