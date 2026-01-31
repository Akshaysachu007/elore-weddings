import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { FaHome, FaUser, FaPhoneAlt, FaBoxOpen } from "react-icons/fa";
import {  useRef } from "react";



function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const[isScrolled , setIsScrolled] = useState(false);
  const menuRef = useRef(null);


  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isActive &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      closeMenu();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [isActive]);

  useEffect(() =>{
    const handleScroll = () => {
      console.log("I am scrolling! Current Y:", window.scrollY);
      if(window.scrollY > 200){
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Elore Weddings Logo" className="logo-image" />
      </div>
      
      {/* Hamburger icon */}
      <div 
        className={`hamburger ${isActive ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Navigation menu */}
      <div ref={menuRef} className={`nav-menu ${isActive ? 'active' : ''}`}>
        <a href="#hero" onClick={closeMenu}><FaHome /> Home</a>
        <a href="#about" onClick={closeMenu}><FaUser /> About Us</a>
         <a href="#packages" onClick={closeMenu}><FaBoxOpen /> Packages</a>
        <a href="#contact" onClick={closeMenu}><FaPhoneAlt /> Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;