import React from 'react';
import dummyData from './Dashboarddummy';
import './Dashboard.css';
import Header from '../../components/Header/Header';

function Dashboard() {
 // ingelogd als gebruiker 3 
  const currentUserId = 3;

  const handleLike = (likedUser) => {
    const reqbody = {
      userId: currentUserId,
      likedUserId: likedUser.id,
    };

    console.log("request body", reqbody);
    console.log("liked user id:", likedUser.id);
  };

  return (
    <>
      <Header />

      <div className="dashboard">
        <h1 className="center">Welkom terug</h1>

        <section className="liked-section">
          <h2 className="center">Mensen die jou hebben geliked:</h2>
          <div className="cards-liked">
            {dummyData.liked.slice(-5).reverse().map((person, index) => (
              <div key={index} className="card">
                <div className="avatar"></div>
                <h3>{person.name}</h3>
                <p>{person.gender}</p>
                <p>{person.oneliner}</p>
                <button onClick={() => handleLike(person)}>&hearts;</button>
              </div>
            ))}
          </div>
          <a href="/likedyou" className="see-more-button">Verder zoeken</a>
        </section>

        <section className="potential-section">
          <h2 className="center">Mensen die je misschien wel leuk vindt</h2>
          <div className="cards-potential">
            {dummyData.potentialMatches.slice(0, 5).map((person, index) => (
              <div key={index} className="card">
                <div className="avatar"></div>
                <h3>{person.name}</h3>
                <p>{person.gender}</p>
                <p>{person.oneliner}</p>
                <button onClick={() => handleLike(person)}>&hearts;</button>
              </div>
            ))}
          </div>
          <a href="/zoeken" className="see-more-button">Verder zoeken</a>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
