import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './App.css';
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import About from './pages/About';  
import Profile from './pages/Profile';
import LogInPage from './pages/LogIn';
import PetRegistration from './pages/PetRegistration';
import Dashboard from './pages/Dashboard';
import DogHouse from './pages/DogHouse';

import RegistrationPage from './pages/Registration';
// import firebase
import './firebase.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />  { }
        <Route path='/login' element={<LogInPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path ='/petregistration' element={<PetRegistration />} />
        <Route path ='/profile' element={<Profile />} />
        <Route path ='/doghouse' element={<DogHouse />} />
      </Routes>
    </Router>
  );
}

export default App;
