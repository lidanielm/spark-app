// client/src/components/Login.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LoggedInContext } from '../context/LoggedInContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loggedInUser, setLoggedInUser } = useContext(LoggedInContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = (e: any) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res =
                await axios.post('http://localhost:5050/api/auth/login',
                    {
                        username,
                        password
                    });
            localStorage.setItem('token', res.data.token);
            setLoggedInUser(username);

            // Set success message
            setMessage('Logged in successfully');
        } catch (err: any) {
            console.error(err.response.data);
            // Set error message
            setMessage('Failed to login - wrong credentials');
        }
    };

    return (
        <>
            <div className="auth-form border-2">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required />
                    <input type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required />
                    <button type="submit">Login</button>
                </form>
                <p className="message">{message}</p>
            </div>
            <Link to="/register">Register</Link>
        </>
    );
};

export default Login;
