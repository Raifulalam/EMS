import React, { useState } from 'react';
import './Login.css'

function LoginComponents() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
        // You can perform login logic here
    };

    return (
        <div className="login_container">
            <div className="loginPage">
                <h2>Welcome Back Guest </h2>
                <p>Please enter the details to login</p>
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter you email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <p>Don't have an account?</p>
                <a href="/signup">Create now</a>
            </div>
        </div>
    );
}

export default LoginComponents;
