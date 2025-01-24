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
                    'x-api-key': `${process.env.REACT_APP_API_KEY}` 
                }
            });

            console.log('Response status:', response.status);

            if (response.status === 200) {
                console.log('Succesvol ingelogd', response.data);
                navigate('/home'); // Stuur gebruiker door naar Landpage.js
            } else {
                console.log('Ongeldige inloggegevens:', response.data);
                alert('E-mail of wachtwoord is onjuist. Probeer het opnieuw.');
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
            alert('Er is een fout opgetreden. Probeer het later opnieuw.');
        }
    };

    return (
        <div className="login-container">
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Voer je e-mail in"
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
                        placeholder="Voer je wachtwoord in"
                    />
                </div>
                <button type="submit" className="login-button">Inloggen</button>
            </form>
            <div className="links">
                <a href="/forgot-password">Wachtwoord vergeten?</a>
                <a href="/register">Nog geen account? Registreren</a>
            </div>
        </div>
    );
};

export default Login;