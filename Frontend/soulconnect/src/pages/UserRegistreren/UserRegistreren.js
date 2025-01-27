import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRegistreren.css';

const UserRegistreren = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [bio, setBio] = useState('');
    const [interests, setInterests] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 1) {
            const today = new Date();
            const birthDate = new Date(dob);
            const age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();

            if (age < 18 || (age === 18 && month < 0)) {
                setError('Je moet 18 jaar of ouder zijn om je te registreren');
                return;
            }

            const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
            if (!passwordPattern.test(password)) {
                setError('Wachtwoord voldoet niet aan de vereisten: minimaal 16 karakters, 1 hoofdletter, 1 cijfer en 1 speciaal teken');
                return;
            }

            setError('');
            setStep(2);
        } else {
            // Voeg hier je profiel aanmaken logica toe
            console.log('Profiel aanmaken:', { profilePicture, bio, interests });
            navigate('/home');
        }
    };

    return (
        <div className="container">
            {step === 1 && (
                <>
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
                        <button type="submit">Volgende</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
            {step === 2 && (
                <>
                    <h2>Profiel Aanmaken</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="profilePicture">Profielfoto:</label>
                            <input
                                type="file"
                                id="profilePicture"
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="interests">Interesses:</label>
                            <input
                                type="text"
                                id="interests"
                                value={interests}
                                onChange={(e) => setInterests(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Profiel Aanmaken</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default UserRegistreren;