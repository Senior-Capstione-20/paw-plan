import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Dashboard from './pages/Dashboard';  // Import the Dashboard component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />  { }
      </Routes>
    </Router>
  );
}

export default App;
