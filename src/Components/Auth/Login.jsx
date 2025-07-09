import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';
import { UserContext } from './authContext'; // adjust path if needed

function LoginComponents() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Step 1: Login
            const res = await API.post('/auth/login', { email, password });
            const token = res.data.token;

            if (!token) throw new Error("Token not received");

            localStorage.setItem('token', token);

            // Step 2: Fetch current user
            const userRes = await API.get('/auth/me');
            const user = userRes.data;

            console.log('✅ User data:', user);

            setUser(user); // ✅ Update context for entire app

            // Step 3: Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login_container">
            <div className="login_box">
                <h2>Login</h2>
                <p className="login_subtitle">Access your account</p>

                {error && <div className="login_error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="signup_link">
                    Don’t have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginComponents;
