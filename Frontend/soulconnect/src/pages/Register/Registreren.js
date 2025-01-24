import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './Registreren.css';

const Registreren = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        birthdate: '',
        postcode: '',
        gender: '',
        facePhoto: null,
        uploadedPhoto: null,
        nickname: '',
        oneliner: '',
        waarderingRelatie: '',
        partnerZoeken: '',
        interesseGeslacht: '',
        relatieOpen: '',
        termsAccepted: false,
    });
    const [step, setStep] = useState(1);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [tempPhoto, setTempPhoto] = useState(null);
    const webcamRef = React.useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({
                    ...formData,
                    [name]: event.target.result,
                });
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleWebcamCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setTempPhoto(imageSrc);
        setWebcamEnabled(false);
    };

    const handleKeepPhoto = () => {
        setFormData({ ...formData, facePhoto: tempPhoto });
        setTempPhoto(null);
    };

    const handleRetakePhoto = () => {
        setTempPhoto(null);
        setWebcamEnabled(true);
    };

    const handleRemovePhoto = () => {
        setFormData({ ...formData, facePhoto: null });
        setWebcamEnabled(true);
    };

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
            if (!formData.termsAccepted) {
                alert('Je moet akkoord gaan met de algemene voorwaarden en privacyregels.');
                return;
            }
            console.log('Ingevoerde gegevens:', formData);
            navigate('/home');
        }
    };

    return (
        <div className="container">
            <h2>Registreren</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <>
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
                        <button type="submit" className="button">Volgende</button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="form-group">
                            <label htmlFor="email">Herhaal e-mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthdate">Herhaal geboortedatum:</label>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postcode">Postcode:</label>
                            <input
                                type="text"
                                id="postcode"
                                name="postcode"
                                value={formData.postcode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Geslacht:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecteer je geslacht</option>
                                <option value="male">Man</option>
                                <option value="female">Vrouw</option>
                                <option value="other">Anders</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="uploadedPhoto">Upload een bestaande foto:</label>
                            <input
                                type="file"
                                id="uploadedPhoto"
                                name="uploadedPhoto"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                            {formData.uploadedPhoto && (
                                <img src={formData.uploadedPhoto} alt="Uploaded Face" className="uploaded-photo" />
                            )}
                        </div>
                        <div className="form-group webcam-container">
                            <label>Neem een nieuwe foto:</label>
                            {webcamEnabled ? (
                                <div>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        width={400}
                                        height={240}
                                        videoConstraints={{
                                            width: 400,
                                            height: 240,
                                            facingMode: "user"
                                        }}
                                        mirrored={true}
                                        className="webcam-video"
                                    />
                                    <button type="button" onClick={handleWebcamCapture}>Capture Photo</button>
                                </div>
                            ) : (
                                !formData.facePhoto && !tempPhoto && (
                                    <button type="button" onClick={() => setWebcamEnabled(true)}>Enable Webcam</button>
                                )
                            )}
                            {tempPhoto && (
                                <div>
                                    <img src={tempPhoto} alt="Temporary Face" className='tempphoto'/>
                                    <div className="button-group">
                                        <button type="button" onClick={handleKeepPhoto}>Keep Photo</button>
                                        <button type="button" onClick={handleRetakePhoto}>Retake Photo</button>
                                    </div>
                                </div>
                            )}
                            {formData.facePhoto && !tempPhoto && (
                                <div>
                                    <img src={formData.facePhoto} alt="Face" className='usedphoto' />
                                    <button type="button" onClick={handleRemovePhoto}>Retake Photo</button>
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oneliner">Oneliner:</label>
                            <input
                                type="text"
                                id="oneliner"
                                name="oneliner"
                                value={formData.oneliner}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="waarderingRelatie">Waardering Relatie:</label>
                            <input
                                type="text"
                                id="waarderingRelatie"
                                name="waarderingRelatie"
                                value={formData.waarderingRelatie}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="partnerZoeken">Wat je zoekt in een partner:</label>
                            <input
                                type="text"
                                id="partnerZoeken"
                                name="partnerZoeken"
                                value={formData.partnerZoeken}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="interesseGeslacht">Welk geslacht interesseert je:</label>
                            <select
                                id="interesseGeslacht"
                                name="interesseGeslacht"
                                value={formData.interesseGeslacht}
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
                            <label htmlFor="relatieOpen">Relatie waar je open voor staat:</label>
                            <input
                                type="text"
                                id="relatieOpen"
                                name="relatieOpen"
                                value={formData.relatieOpen}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="termsAccepted">
                                Ik ga akkoord met de <a href="/terms">algemene voorwaarden</a> en <a href="/privacy">privacyregels</a>.
                            </label>
                        </div>
                        <button type="submit">Profiel Aanmaken</button>
                    </>
                )}
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Registreren;