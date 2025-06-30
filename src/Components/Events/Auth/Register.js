import React, { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            alert('Registration failed', err);
        }
    };

    return (
        <form onSubmit={registerHandler}>
            <h2>Register</h2>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
