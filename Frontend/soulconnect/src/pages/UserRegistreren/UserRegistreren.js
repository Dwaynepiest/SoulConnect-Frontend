import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegistreren.css';

const UserRegistreren = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        birth_date: '',
        repeatEmail: '',
        repeatPassword: '',
        gender: '',
        nickname: '',
        zip_code: '',
        accept_service: false,
        one_liner: '',
        relationshipType: '',
        hobby: '',
        bio: '',
        job: '',
        education: '',
        profilePicture: null,
        interestedInGender: ''
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            // Step 1 validation
            const today = new Date();
            const birthDate = new Date(formData.birth_date);
            const age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();

            if (age < 18 || (age === 18 && month < 0)) {
                setError('Je moet 18 jaar of ouder zijn om je te registreren');
                return;
            }

            const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
            if (!passwordPattern.test(formData.password)) {
                setError('Wachtwoord voldoet niet aan de vereisten: minimaal 16 karakters, 1 hoofdletter, 1 cijfer en 1 speciaal teken');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3001/users', {
                    email: formData.email,
                    password: formData.password,
                    birth_date: formData.birth_date,
                    gender: formData.gender,
                    nickname: formData.nickname,
                    zip_code: formData.zip_code,
                    accept_service: formData.accept_service
                });

                if (response.status === 200) {
                    localStorage.setItem('userId', response.data.userId); 
                    setStep(2);
                } else {
                    setError('Er is een fout opgetreden bij het registreren.');
                }
            } catch (error) {
                setError('Er is een fout opgetreden bij het registreren.');
            }
        } else if (step === 2) {
            // Step 2 validation
            if (formData.repeatEmail !== formData.email) {
                setError('Herhaalde e-mail komt niet overeen met de oorspronkelijke e-mail');
                return;
            }

            if (formData.repeatPassword !== formData.password) {
                setError('Herhaald wachtwoord komt niet overeen met het oorspronkelijke wachtwoord');
                return;
            }

            const postcodePattern = /^[1-9][0-9]{3}[A-Z]{2}$/i;
            if (!postcodePattern.test(formData.zip_code)) {
                setError('Voer een geldige Nederlandse postcode in (bijv. 1234AB)');
                return;
            }

            setStep(3);
        } else if (step === 3) {
            // Step 3: Send data
            try {
                const userId = localStorage.getItem('userId');
                const form = new FormData();
                Object.keys(formData).forEach(key => {
                    form.append(key, formData[key]);
                });

                form.append('userId', userId);

                const response = await axios.post('http://localhost:3001/extra', form, {
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });

                if (response.status === 200) {
                    navigate('/dashboard');
                } else {
                    setError('Er is een fout opgetreden bij het verzenden van de gegevens.');
                }
            } catch (error) {
                setError('Er is een fout opgetreden bij het verzenden van de gegevens.');
            }
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
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Wachtwoord:</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birth_date">Geboortedatum:</label>
                            <input
                                type="date"
                                id="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Geslacht:</label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecteer je geslacht</option>
                                <option value="male">Man</option>
                                <option value="female">Vrouw</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zip_code">Postcode:</label>
                            <input
                                type="text"
                                id="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                type="text"
                                id="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accept_service">
                                <input
                                    type="checkbox"
                                    id="accept_service"
                                    checked={formData.accept_service}
                                    onChange={handleChange}
                                    required
                                />
                                Ik ga akkoord met de servicevoorwaarden
                            </label>
                        </div>
                        <button type="submit">Volgende</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}

            {step === 2 && (
                <>
                    <h2>Relatie en voorkeuren</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="repeatEmail">Herhaal E-mail:</label>
                            <input
                                type="email"
                                id="repeatEmail"
                                value={formData.repeatEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Herhaal Wachtwoord:</label>
                            <input
                                type="password"
                                id="repeatPassword"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="one_liner">Oneliner:</label>
                            <input
                                type="text"
                                id="one_liner"
                                value={formData.one_liner}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="relationshipType">Soort relatie:</label>
                            <select
                                id="relationshipType"
                                value={formData.relationshipType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecteer</option>
                                <option value="fr">Vriendschappelijke Relatie</option>
                                <option value="or">Open Relatie</option>
                                <option value="fwb">FWB</option>
                            </select>
                        </div>
                        <button type="submit">Volgende</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}

            {step === 3 && (
                <>
                    <h2>Extra Profiel Informatie</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="hobby">Hobby's:</label>
                            <textarea
                                id="hobby"
                                value={formData.hobby}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Over jou:</label>
                            <textarea
                                id="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="job">Werkzaam:</label>
                            <textarea
                                id="job"
                                value={formData.job}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Educatie:</label>
                            <textarea
                                id="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Bevestigen</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default UserRegistreren;
