import React from 'react';
import Stories from '../components/Stories';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import '../App.css';
import Packages from "../components/Packages";
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />
      {/* This is the section we jump to when clicking "View Stories" */}
      <section id="stories" className="stories-section">
        <Stories />
      </section>
      <section id="services" className="services-section">
        <Services />
      </section>
      <section id="packages" className="packages-section">
        <Packages />
      </section>
      <section id="about" className="about-section">
        <About />
      </section>
      <section id="contact" className="contact-section">
        <Contact />
      </section>
      <section id="footer" className="footer-section">
        <Footer />
      </section>

    </div>
  );
}

export default App;
