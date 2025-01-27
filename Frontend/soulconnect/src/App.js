import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registreren from './pages/Register/registreren';
import Home from './pages/Home/Home';
import BerichtenPagina from './pages/Berichten/berichten';
import ChatPage from './pages/Berichten/bericht';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registreren />} />
        <Route path="/home" element={<Home />} />
        <Route path="/berichten" element={<BerichtenPagina />}/>
        <Route path=":messageId" element={<ChatPage />} />
        
        <Route path='/dashboard' element={<Dashboard />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;