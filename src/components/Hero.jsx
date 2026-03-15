import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  // Your specific Cloudinary URLs
  const slides = [
    "https://res.cloudinary.com/dmjrqytgd/image/upload/v1773545924/wedding1_w2tqb8.jpg",
    "https://res.cloudinary.com/dmjrqytgd/image/upload/v1773545924/wedding3_nmyupb.jpg",
    "https://res.cloudinary.com/dmjrqytgd/image/upload/v1773545925/wedding2_qskgwb.jpg",
    "https://res.cloudinary.com/dmjrqytgd/image/upload/v1773545925/wedding4_pxsh2u.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Helper function to apply Cloudinary transformations:
   * f_auto: Best format (WebP/AVIF) based on browser
   * q_auto: Best quality-to-compression ratio
   * w_1920: Prevents loading oversized 4k images on HD screens
   * c_limit: Resizes only if the original is larger than the width
   */
  const getOptimizedUrl = (url) => {
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_1920,c_limit/');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="hero" 
      id="hero" 
      style={{ 
        backgroundImage: `url(${getOptimizedUrl(slides[currentSlide])})`,
        transition: 'background-image 1s ease-in-out' // Smooth crossfade effect
      }}
    >
      {/* Invisible Preloader: Loads next images in background to prevent flickering */}
      <div style={{ display: 'none' }}>
        {slides.map((src, index) => (
          <img key={index} src={getOptimizedUrl(src)} alt="preload" />
        ))}
      </div>

      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Capturing emotions. <br/> Preserving forever.</h1>
          </div>
          <div className="hero-buttons">
            <button 
              className="btn-solid" 
              onClick={() => handleScroll('stories')}
            >
              View Stories
            </button>
            <button 
              className="btn-outline" 
              onClick={() => handleScroll('contact')}
            >
              Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;