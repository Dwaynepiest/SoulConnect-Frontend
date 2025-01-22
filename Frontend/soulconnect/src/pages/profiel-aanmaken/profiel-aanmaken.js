import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './profiel-aanmaken.css';

const ProfielAanmaken = () => {
  const [formData, setFormData] = useState({
    email: '',
    birthdate: '',
    postcode: '',
    gender: '',
    facePhoto: null,
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
  const webcamRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleWebcamCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFormData({ ...formData, facePhoto: imageSrc });
    setWebcamEnabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      if (!formData.termsAccepted) {
        alert('Je moet akkoord gaan met de algemene voorwaarden en privacyregels.');
        return;
      }
      console.log('Ingevoerde gegevens:', formData);
      // Voeg hier logica toe om gegevens te verwerken
    }
  };

  return (
    <div className="profile-container">
      <h2>Profiel Aanmaken</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
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
              <label htmlFor="birthdate">Geboortedatum:</label>
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
              <label>Gezichts foto:</label>
              {webcamEnabled ? (
                <div>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                    videoConstraints={{
                      width: 320,
                      height: 240,
                      facingMode: "user"
                    }}
                  />
                  <button type="button" onClick={handleWebcamCapture}>Capture Photo</button>
                </div>
              ) : (
                <button type="button" onClick={() => setWebcamEnabled(true)}>Enable Webcam</button>
              )}
              {formData.facePhoto && <img src={formData.facePhoto} alt="Face" />}
            </div>
            <button type="submit">Volgende</button>
          </>
        )}
        {step === 2 && (
          <>
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
    </div>
  );
};

export default ProfielAanmaken;