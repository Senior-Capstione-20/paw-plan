import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import './App.css';
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import About from './pages/About';  
import LogInPage from './pages/LogIn';
import PetRegistration from './components/PetRegistration';

// import pet registration component


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/petregistration' element={<PetRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
