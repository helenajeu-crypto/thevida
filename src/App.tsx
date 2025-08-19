import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import LocationIncheon from './pages/LocationIncheon';
import LocationAnyang from './pages/LocationAnyang';
import RehabilitationProgram from './pages/RehabilitationProgram';
import CognitiveProgram from './pages/CognitiveProgram';
import BirthdayParty from './pages/BirthdayParty';
import ServicesGuide from './pages/ServicesGuide';
import Company from './pages/Company';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations/incheon" element={<LocationIncheon />} />
            <Route path="/locations/anyang" element={<LocationAnyang />} />
            <Route path="/rehabilitation" element={<RehabilitationProgram />} />
            <Route path="/cognitive" element={<CognitiveProgram />} />
            <Route path="/birthday" element={<BirthdayParty />} />
            <Route path="/services-guide" element={<ServicesGuide />} />
            <Route path="/company" element={<Company />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
