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
import {initializeApp} from 'firebase/app';

import RegistrationPage from './pages/Registration';
// import pet registration component

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIfqQxDGMRiiVl_jSh6JSBpnzYtO_LyuY",
  authDomain: "paw-plan-96d84.firebaseapp.com",
  projectId: "paw-plan-96d84",
  storageBucket: "paw-plan-96d84.appspot.com",
  messagingSenderId: "680254872125",
  appId: "1:680254872125:web:de1f95db2bd54bc3a06854",
  measurementId: "G-WY7L3Y67DX"
};

const app = initializeApp(firebaseConfig);

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

      </Routes>
    </Router>
  );
}

export default App;
