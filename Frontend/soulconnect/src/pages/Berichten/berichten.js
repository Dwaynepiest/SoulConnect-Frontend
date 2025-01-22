import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom'; 
import { messages } from './messages'; 

function BerichtenPagina() {
  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    setMessagesData(messages); 
  }, []);


  const lastMessages = messagesData.reduce((acc, msg) => {
    if (msg.sender === 'You') {
      return acc; 
    }

    const contactId = msg.receiver === 'You' ? msg.sender : msg.receiver; 

    if (!acc[contactId]) {
      acc[contactId] = msg; 
    } else {
   
      if (new Date(msg.timestamp) > new Date(acc[contactId].timestamp)) {
        acc[contactId] = msg;
      }
    }
    return acc;
  }, {});

  const lastMessagesArray = Object.values(lastMessages);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <h2>Chats</h2>
        {lastMessagesArray.map((msg) => (
          <Link
            key={msg.id}
            to={`/berichten/${msg.receiver === 'You' ? msg.sender : msg.receiver}`}
            style={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              marginBottom: '10px',
            }}
          >
            <img
              src={msg.profilePicture}
              alt={`${msg.receiver === 'You' ? msg.sender : msg.receiver}'s profile`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <div style={{ marginLeft: '10px' }}>
              <p>
                <strong>{msg.receiver === 'You' ? msg.sender : msg.receiver}</strong>
                <small>{msg.timestamp}</small>
              </p>
              <p>{msg.message}</p>
            </div>
          </Link>
        ))}
      </div>


      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet /> 
      </div>
    </div>
  );
}

export default BerichtenPagina;
