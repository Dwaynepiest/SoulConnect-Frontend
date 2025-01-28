import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegistreren.css';

const UserRegistreren = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        birth_date: '',
        gender: '',
        nickname: '',
        zip_code: '',
        accept_service: false,
        one_liner: '',
        relation: '',
        hobby: '',
        about_you: '',
        job: '',
        education: '',
        profilePicture: null,
        preference: ''
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
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

            setError('');
            setStep(2);
        } else if (step === 2) {
            // if (formData.repeatEmail !== formData.email) {
            //     setError('Herhaalde e-mail komt niet overeen met de oorspronkelijke e-mail');
            //     return;
            // }

            // if (formData.repeatPassword !== formData.password) {
            //     setError('Herhaald wachtwoord komt niet overeen met het oorspronkelijke wachtwoord');
            //     return;
            // }

            const postcodePattern = /^[1-9][0-9]{3}[A-Z]{2}$/i;
            if (!postcodePattern.test(formData.zip_code)) {
                setError('Voer een geldige Nederlandse postcode in (bijv. 1234AB)');
                return;
            }

            if (!formData.accept_service) {
                setError('Je moet akkoord gaan met de servicevoorwaarden');
                return;
            }

            setError('');
            setStep(3);
        } else {
            try {
                const form = new FormData();
                Object.keys(formData).forEach(key => {
                    form.append(key, formData[key]);
                });

                const response = await axios.post('http://localhost:3001/users/', form, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.REACT_APP_API_KEY
                    }
                });

                if (response.status === 200) {
                    navigate('/dashboard');
                } else {
                    setError('Er is een fout opgetreden bij het registreren');
                }
            } catch (error) {
                setError('Er is een fout opgetreden bij het registreren');
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
                        <button type="submit">Volgende</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
            {step === 2 && (
                <>
                    <h2>Profiel Aanmaken</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="form-group">
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
                        </div> */}
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
                            <label htmlFor="profilePicture">Profielfoto:</label>
                            <input
                                type="file"
                                id="profilePicture"
                                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preference">Geslacht waarin je geïnteresseerd bent:</label>
                            <select
                                id="preference"
                                value={formData.preference}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecteer</option>
                                <option value="male">Man</option>
                                <option value="female">Vrouw</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="relation">Soort relatie waarin je geïnteresseerd bent:</label>
                            <select
                                id="relation"
                                value={formData.relation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecteer</option>
                                <option value="fr">Vriendschapelijke Relatie</option>
                                <option value="or">Open Relatie</option>
                                <option value="fwb">FWB</option>
                            </select>
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
            {step === 3 && (
                <>
                    <h2>Extra Informatie</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="about_you">Biografie:</label>
                            <textarea
                                id="about_you"
                                value={formData.about_you}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hobby">Interesses:</label>
                            <input
                                type="text"
                                id="hobby"
                                value={formData.hobby}
                                onChange={handleChange}
                                required
                            />
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
                        <button type="submit">Profiel Aanmaken</button>
                    </form>
                    {error && <p>{error}</p>}
                </>
            )}
        </div>
    );
};

export default UserRegistreren;