import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook voor navigatie

    const handleSubmit = (e) => {
        e.preventDefault();

        // Controleer of de ingevoerde gegevens correct zijn
        if (email === 'test@gmail.com' && password === '123') {
            console.log('Succesvol ingelogd');
            navigate('/landpage'); // Stuur gebruiker door naar Landpage.js
        } else {
            console.log('Ongeldige inloggegevens');
            alert('E-mail of wachtwoord is onjuist. Probeer het opnieuw.');
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
