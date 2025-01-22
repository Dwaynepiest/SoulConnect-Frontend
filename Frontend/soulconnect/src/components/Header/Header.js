import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/user-profile'); // Change this to the actual path you want to navigate to
    };

    const handleBellClick = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="header">
            <h1>SoulConnect.nl</h1>
            <div className="icons">
                <FontAwesomeIcon icon={faUser} className="icon" onClick={handleUserClick} />
                <FontAwesomeIcon icon={faBell} className="icon" onClick={handleBellClick} />
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
            {showNotifications && (
                <div className="notification-box">
                    <p>Latest Notifications</p>
                    {/* Add your notifications here */}
                </div>
            )}
        </div>
    );
};

export default Header;