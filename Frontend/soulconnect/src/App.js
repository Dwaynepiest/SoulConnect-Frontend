import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import UserRegistreren from './pages/UserRegistreren/UserRegistreren';
import BerichtenPagina from './pages/Berichten/berichten';
import ChatPage from './pages/Berichten/bericht';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='home' element={<Home/>}/>
        <Route path="/register" element={<UserRegistreren />} />
        <Route path="/berichten" element={<BerichtenPagina />}>
          <Route path=":messageId" element={<ChatPage />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;