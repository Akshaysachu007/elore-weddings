
import "../styles/About.css";
import { FiPhone, FiInstagram, FiMapPin } from "react-icons/fi"; // Importing icons

const About = () => {

   const handleScrollBookings = () => {
    const section = document.getElementById('contact');
    section.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="about-container">

      {/* Hero */}
      <section className="about-hero">
        <h1>More Than Photography.</h1>
        <h2>We Capture Feelings.</h2>
        <p>
          From weddings to intimate family celebrations, we tell stories that last forever.
        </p>
      </section>

      {/* Who We Are */}
      <section className="about-section">
        <h3>Who We Are</h3>
        <p>
          We are a passionate photography and filmmaking team dedicated to capturing
          life’s most meaningful moments. Whether it’s a grand wedding, a joyful birthday,
          or a simple family gathering, every celebration matters to us.
        </p>
      </section>
      {/* Location */}
      <section className="about-location">
        <a 
        href="https://maps.app.goo.gl/HgsQnG21CpQV3FDG9" 
        target="_blank" 
        rel="noopener noreferrer"
        className="location-link"
         >
        <div className="location-content">
          <FiMapPin className="location-icon" />
          <div className="location-text">
            <h4>Based in</h4>
            <p>Chavara, Kollam , Kerala</p>
          </div>
        </div>
        </a>
      </section>
      {/* What We Cover */}
      <section className="about-section">
        <h3>What We Cover</h3>
        <ul className="about-list">
          <li>Wedding Photography & Films</li>
          <li>Pre-Wedding Shoots</li>
          <li>Birthday Celebrations</li>
          <li>Engagements & Receptions</li>
          <li>Family & Private Events</li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="about-section">
        <h3>Why Choose Us</h3>
        <ul className="about-list">
          <li>Story-driven photography & films</li>
          <li>Premium albums & cinematic edits</li>
          <li>Friendly, professional team</li>
          <li>On-time delivery & transparent pricing</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h4>Let's Capture Your Story</h4>
        <p>
          Every moment deserves to be remembered. From intimate celebrations to grand weddings, 
          we're here to preserve your precious memories with artistry and passion.
        </p>
        <button onClick={handleScrollBookings}>
          <FiPhone className="phone-icon" />  
          Contact Us Today
        </button>
      </section>

      {/* Founder Section */}
<section className="about-founder">
  <h3>Meet the Founder</h3>

  <p>
    Founded by <strong>Anandhu Chikku</strong>, our journey began with a deep passion
    for storytelling and capturing emotions through the lens.
    What started as a love for photography has grown into a creative studio trusted
    to document weddings, birthdays, and cherished family moments.
  </p>

  <a
    href="https://www.instagram.com/chikku_._._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    target="_blank"
    rel="noopener noreferrer"
    className="instagram-link"
  ><FiInstagram  className="social-icon"/>
    Follow on Instagram 
  </a>
</section>


    </div>
  );
};

export default About;
