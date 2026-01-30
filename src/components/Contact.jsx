import { Phone, Mail, Instagram } from "lucide-react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-header">
        <h1>Let’s Create Memories Together</h1>
        <p>
          Reach out for weddings, birthdays, family events, or any special
          occasion. We’d love to hear your story.
        </p>
        <div className="booking-text">
        <p>
          For Bookings & Enquiries: call +91 7592864164 or tap the options below
        </p>
        </div>
      </div>

      <div className="contact-cards">
        {/* Call */}
        <a href="tel:+917592864164" className="contact-card">
          <Phone />
          <h3>Call Us</h3>
          <p>Instant bookings & enquiries</p>
        </a>

        {/* Email */}
        <a
          href="mailto:eloreweddings@gmail.com"
          className="contact-card"
        >
          <Mail />
          <h3>Email Us</h3>
          <p>Share your event details</p>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/eloreweddings"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <Instagram />
          <h3>DM on Instagram</h3>
          <p>Quick replies & recent works</p>
        </a>
      </div>

    </section>
  );
};

export default Contact;
