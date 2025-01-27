// import React, { useState } from 'react';
// import './profiel-aanmaken.css';

// const ProfielAanmaken = () => {
//   const [formData, setFormData] = useState({
//     nickname: '',
//     oneliner: '',
//     gender: '',
//     birthdate: '',
//     termsAccepted: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.termsAccepted) {
//       alert('Je moet akkoord gaan met de algemene voorwaarden en privacyregels.');
//       return;
//     }
//     console.log('Ingevoerde gegevens:', formData);
//     // Voeg hier logica toe om gegevens te verwerken
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profiel Aanmaken</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="nickname">Nickname:</label>
//           <input
//             type="text"
//             id="nickname"
//             name="nickname"
//             value={formData.nickname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="oneliner">Oneliner:</label>
//           <input
//             type="text"
//             id="oneliner"
//             name="oneliner"
//             value={formData.oneliner}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="gender">Geslacht:</label>
//           <select
//             id="gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Selecteer je geslacht</option>
//             <option value="male">Man</option>
//             <option value="female">Vrouw</option>
//           </select>
//         </div>
//         <div className="form-group checkbox-group">
//           <input
//             type="checkbox"
//             id="termsAccepted"
//             name="termsAccepted"
//             checked={formData.termsAccepted}
//             onChange={handleChange}
//           />
//           <label htmlFor="termsAccepted">
//             Ik ga akkoord met de <a href="/terms">algemene voorwaarden</a> en <a href="/privacy">privacyregels</a>.
//           </label>
//         </div>
//         <button type="submit">Profiel Aanmaken</button>
//       </form>
//     </div>
//   );
// };

// export default ProfielAanmaken;