// src/App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BerichtenPagina from './Berichten/berichten';
import ChatPage from './Berichten/bericht';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
    <Routes>
      <Route path="/berichten" element={<BerichtenPagina />}>
        <Route path=":messageId" element={<ChatPage />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default AppRoutes;
