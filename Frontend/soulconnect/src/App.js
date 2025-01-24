import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registreren from './pages/Register/Registreren';
import Home from './pages/Home/Home';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registreren />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;