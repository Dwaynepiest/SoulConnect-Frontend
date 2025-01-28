import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../../Components/Header/Header';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState('alle');

  const currentUserId = 3; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();
        const formattedUsers = data.results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          avatar: user.picture.large,
          oneliner: `${user.location.city}, ${user.location.country}`,
        }));
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  // persoon liken, gebruikt useeffect om de gelikete gebruikers te tonen vanwege geen connectie met database
  const handleLike = (likedUser) => {
    setLikedUsers((prev) => [...prev, likedUser]);
    removeUserFromList(likedUser.id);
  };

  const handleDislike = (dislikedUser) => {
    setDislikedUsers((prev) => [...prev, dislikedUser]);
    removeUserFromList(dislikedUser.id);

  };

  const removeUserFromList = (userId) => {
    setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleFilterChange = (event) => {
    const gender = event.target.value;
    setGenderFilter(gender);

    if (gender === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.gender === gender));
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <h1 className="center">Welkom terug</h1>
        <div className="filter-section">
          <label htmlFor="gender-filter">Filter op geslacht:</label>
          <select
            id="gender-filter"
            value={genderFilter}
            onChange={handleFilterChange}
          >
            <option value="alle">Alle</option>
            <option value="male">Mannen</option>
            <option value="female">Vrouwen</option>
          </select>
        </div>

        {/* mensen die jij een like hebt gegeven */}

        {likedUsers.length > 0 && (
          <section className="liked-section">
            <h2 className="center">Mensen die jij hebt geliked:</h2>
            <div className="cards-liked">
              {likedUsers.map((person) => (
                <div key={person.id} className="card">
                  <img
                    src={person.avatar}
                    alt={`${person.name}'s avatar`}
                    className="avatar"
                  />
                  <h3>{person.name}</h3>
                  <p>{person.gender}</p>
                  <p>{person.oneliner}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* mogelijke matches */}

        <section className="potential-section">
          <h2 className="center">Mensen die je misschien wel leuk vindt</h2>
          <div className="cards-potential">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((person) => (
                <div key={person.id} className="card">
                  <img
                    src={person.avatar}
                    alt={`${person.name}'s avatar`}
                    className="avatar"
                  />
                  <h3>{person.name}</h3>
                  <p>{person.gender}</p>
                  <p>{person.oneliner}</p>
                  <div className="action-buttons">
                    <button className="action-button like" onClick={() => handleLike(person)}>
                      <span className="icon">❤️</span> 
                    </button>
                    <button className="action-button dislike" onClick={() => handleDislike(person)}>
                      <span className="icon">❌</span> 
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="center">Geen matches</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
