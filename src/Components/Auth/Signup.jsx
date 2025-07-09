import React, { useState } from "react";
import './Signup.css';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';

function SignupComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await API.post('/auth/register', {
                name,
                email,
                password,
                phone
            });

            const token = res.data.token;
            if (token) {
                localStorage.setItem('token', token);
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert('Registered but no token received.');

            }

        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Create Your Account</h2>
                <p className="subtitle">Join the Event Management System</p>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupComponent;
