import "../styles/Services.css";

const Services = () => {
  const handleScrollBookings = () => {
    const section = document.getElementById('contact');
    section.scrollIntoView({ behavior: 'smooth' });
  }




  const services = [
    { title: "Weddings", desc: "Grand celebrations & timeless films" },
    { title: "Pre-Wedding", desc: "Love stories before the big day" },
    { title: "Birthdays", desc: "Joyful moments & memories" },
    { title: "Family Events", desc: "Intimate celebrations captured" },
    { title: "Engagements", desc: "Beautiful beginnings" },
  ];

  return (
    <section className="services-section">
      <h2>What We Cover</h2>
      <p className="services-sub">
        From grand weddings to intimate family moments
      </p>

      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="cta-container">
        <p className="cta-text">
        Looking for coverage for a birthday, family function, or a custom event?
        <br />
        We’d love to hear about it.
      </p>

      <button
        className="cta-btn"
        onClick={handleScrollBookings}
      >
        Contact Us
      </button>
      </div>
    </section>
    
    
  );
};

export default Services;
