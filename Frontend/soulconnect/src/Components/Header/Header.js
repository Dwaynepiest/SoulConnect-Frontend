import React from 'react';
import './Header.css';
import logo from '../../Fotos/28607339435.png'; 
import berichten from '../../Fotos/comments.png';
const Header = () => {
    return (
        <header className="header">
            <a href="/dashboard">
            <img src={logo} alt="Soulconnect logo" className="header-logo" />
                </a>

            
            <header>Soulconnect</header>
            <nav className="header-nav">
                <a href="/home">Home</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/berichten">
                    <img 
                        src={berichten} 
                        alt="Berichten icon" 
                        className="berichten-icon" 
                    />
                </a>
                <input type="text" placeholder="Search" className="header-search" />
                <div className="header-profile">
                    <span>Gebruiker</span>
                </div>
            </nav>
        </header>
    );
};

export default Header;
