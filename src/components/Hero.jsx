import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

import wedding1 from '../assets/Wedding1.jpeg';
import wedding2 from '../assets/Wedding2.jpeg';
import wedding3 from '../assets/Wedding3.jpeg';
import wedding4 from '../assets/Wedding4.jpeg';

function Hero() {
  const slides = [
    wedding1,
    wedding2,
    wedding3,
    wedding4
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changes image every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScroll = () => {
    const section = document.getElementById('stories');
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollBookings = () => {
    const section = document.getElementById('contact');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="hero" id="hero" style={{ backgroundImage: `url(${slides[currentSlide]})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-text">
          <h1>Capturing emotions. <br/> Preserving forever.</h1>
          </div>
          <div className="hero-buttons">
            <button className="btn-solid" onClick={handleScroll}>View Stories</button>
            <button className="btn-outline" onClick={handleScrollBookings}>Bookings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;