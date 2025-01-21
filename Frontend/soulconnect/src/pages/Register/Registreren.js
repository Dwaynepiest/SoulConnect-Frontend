import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importeer useNavigate
import './Registreren.css';

const Registreren = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialiseer navigate

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validatie van het wachtwoord en de geboortedatum (minimaal 18 jaar oud)
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (age < 18 || (age === 18 && month < 0)) {
            setError('Je moet 18 jaar of ouder zijn om je te registreren');
            return;
        }

        // Validatie van het wachtwoord
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
        if (!passwordPattern.test(password)) {
            setError('Wachtwoord voldoet niet aan de vereisten: minimaal 16 karakters, 1 hoofdletter, 1 cijfer en 1 speciaal teken');
            return;
        }

        // Als alle validaties zijn doorstaan, ga dan naar de profiel-aanmaken pagina
        setError('');
        navigate('/profiel-aanmaken'); // Navigeren naar de profiel-aanmaken pagina
    };

    return (
        <div className="login-container">
            <h2>Registreren</h2>
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
                <div className="form-group">
                    <label htmlFor="dob">Geboortedatum:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registreren</button>
            </form>
            {error && <p>{error}</p>} {/* Toon foutmelding als er een fout is */}
        </div>
    );
};

export default Registreren;
