import React from "react";
import Header from "../../Components/Header/Header";
import "./Home.css";
import koppel1 from '../../Fotos/Romantic1.png';
import koppel2 from '../../Fotos/Romantic2.png';

const SoulConnect = () => {
  return (
    <div>
      <Header />
      <div className="welcome-section">
        <h1>Welkom bij SoulConnect</h1>
        <p>Jouw reis om in contact te komen met gelijkgestemde zielen begint hier.</p>
      </div>
      <div className="content-container">
        <div className="mission-section">
          <h2>Onze Missie</h2>
          <p>Bij SoulConnect is het onze missie om mensen samen te brengen en diepe, betekenisvolle connecties te creëren.</p>
          <img src={koppel1} alt="Missie" />
        </div>
        <div className="vision-section">
          <h2>Onze Visie</h2>
          <p>Wij dromen van een wereld waarin iedereen zijn of haar zielsverwant kan vinden en samen een sterke, verbonden gemeenschap kan vormen.</p>
          <img src={koppel2} alt="Visie" />
        </div>
      </div>
    </div>
  );
};

export default SoulConnect;
