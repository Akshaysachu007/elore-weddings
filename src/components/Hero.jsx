import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

function Hero() {
  const slides = [
    "/images/wedding1.jpeg",
    "/images/wedding2.jpeg",
    "/images/wedding3.jpeg",
    "/images/wedding4.jpeg",
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