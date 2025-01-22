import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { messages as initialMessages } from './messages'; 

function ChatPage() {
  const { messageId } = useParams(); 
  const [messages, setMessages] = useState(initialMessages); 
  const [newMessage, setNewMessage] = useState(''); 


  const contactMessages = messages.filter(
    (msg) =>
      (msg.sender === messageId && msg.receiver === 'You') ||
      (msg.receiver === messageId && msg.sender === 'You')
  );

  const sortedMessages = contactMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;


    const nieuwBericht = {
      id: messages.length + 1, 
      sender: 'You',
      receiver: messageId,
      message: newMessage,
      timestamp: new Date().toISOString(), 
      profilePicture: '/path-to-your-profile-picture.jpg', 
    };


    setMessages((prevMessages) => [...prevMessages, nieuwBericht]);
    setNewMessage('');
  };

  return (
    <div>
      <h2>Chat with {messageId}</h2>
      <div>
        {sortedMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              marginBottom: '10px',
              justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
            }}
          >
            <img
              src={msg.profilePicture}
              alt={`${msg.sender}'s profile`}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginLeft: msg.sender === 'You' ? '0' : '10px',
                marginRight: msg.sender === 'You' ? '10px' : '0',
              }}
            />
            <div
              style={{
                backgroundColor: msg.sender === 'You' ? 'blue' : 'gray',
                color: msg.sender === 'You' ? 'white' : 'black',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '70%',
                
              }}
            >
              <p>{msg.message}</p>
              <small>{(msg.timestamp)}</small>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: "0", left: "0", width:"100%" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          style={{ width: '60%', padding: '10px', marginRight: '10px', marginLeft: "25%"
           }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Versturen
        </button>
      </div>
    </div>
  );
  
}

export default ChatPage;
