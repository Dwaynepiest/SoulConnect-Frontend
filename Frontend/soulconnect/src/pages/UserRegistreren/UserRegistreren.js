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
    const [repeatEmail, setRepeatEmail] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [postcode, setPostcode] = useState('');
    const [gender, setGender] = useState('');
    const [nickname, setNickname] = useState('');
    const [oneliner, setOneliner] = useState('');
    const [interestedInGender, setInterestedInGender] = useState('');
    const [relationshipType, setRelationshipType] = useState('');
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
            // Validatie van de herhaalde e-mail en wachtwoord
            if (repeatEmail !== email) {
                setError('Herhaalde e-mail komt niet overeen met de oorspronkelijke e-mail');
                return;
            }

            if (repeatPassword !== password) {
                setError('Herhaald wachtwoord komt niet overeen met het oorspronkelijke wachtwoord');
                return;
            }

            // Validatie van de postcode
            const postcodePattern = /^[1-9][0-9]{3}[A-Z]{2}$/i;
            if (!postcodePattern.test(postcode)) {
                setError('Voer een geldige Nederlandse postcode in (bijv. 1234AB)');
                return;
            }

            // Voeg hier je profiel aanmaken logica toe
            console.log('Profiel aanmaken:', { repeatEmail, repeatPassword, postcode, gender, nickname, oneliner, profilePicture, bio, interests, interestedInGender, relationshipType });
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
                            <label htmlFor="repeatEmail">Herhaal E-mail:</label>
                            <input
                                type="email"
                                id="repeatEmail"
                                value={repeatEmail}
                                onChange={(e) => setRepeatEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Herhaal Wachtwoord:</label>
                            <input
                                type="password"
                                id="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postcode">Postcode:</label>
                            <input
                                type="text"
                                id="postcode"
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Geslacht:</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Selecteer je geslacht</option>
                                <option value="male">Man</option>
                                <option value="female">Vrouw</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oneliner">Oneliner:</label>
                            <input
                                type="text"
                                id="oneliner"
                                value={oneliner}
                                onChange={(e) => setOneliner(e.target.value)}
                                required
                            />
                        </div>
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
                            <label htmlFor="bio">Biografie:</label>
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
                        <div className="form-group">
                            <label htmlFor="interestedInGender">Geslacht waarin je geïnteresseerd bent:</label>
                            <select
                                id="interestedInGender"
                                value={interestedInGender}
                                onChange={(e) => setInterestedInGender(e.target.value)}
                                required
                            >
                                <option value="">Selecteer</option>
                                <option value="male">Man</option>
                                <option value="female">Vrouw</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="relationshipType">Soort relatie waarin je geïnteresseerd bent:</label>
                            <select
                                id="relationshipType"
                                value={relationshipType}
                                onChange={(e) => setRelationshipType(e.target.value)}
                                required
                            >
                                <option value="">Selecteer</option>
                                <option value="serious">Serieus</option>
                                <option value="friendly">Vriendschappelijk</option>
                                <option value="fwb">FWB</option>
                            </select>
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