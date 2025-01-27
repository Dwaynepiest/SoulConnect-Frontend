import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook voor navigatie

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email,
                password
            }, {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY 
                },
                withCredentials: '' // Zorg ervoor dat credentials worden meegezonden
            });

            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                setError('Ongeldige inloggegevens');
            }
        } catch (error) {
            setError('Er is een fout opgetreden bij het inloggen');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Wachtwoord:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="links">
                <a href="/register">Registreren</a>
                <a href="/forgot-password">Wachtwoord vergeten?</a>
            </div>
        </div>
    );
};

export default Login;