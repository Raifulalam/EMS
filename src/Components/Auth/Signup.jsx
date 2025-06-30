import React, { useState } from "react";
import './Signup.css';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

function SignupComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Phone:", phone);
        // You can add API call here to send data to backend
        try {
            await API.post('/auth/register', {
                name,
                password,
                phone,
                email
            });
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert('Registration failed', err);
        }
    };

    return (
        <div className="signup_component">
            <div className="signupPage">
                <h2>Welcome to Event Management System!</h2>
                <p>Please fill the details to create an account.</p>
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />



                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <p>Alredy have an account?</p>
                <a href="/login">Login</a>
            </div>
        </div>
    );
}

export default SignupComponent;
