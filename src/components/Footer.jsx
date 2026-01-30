import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <h3>Elore Weddings</h3>
          <p>Capturing love, celebrations & timeless memories.</p>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <a href="tel:+919876543210">Call</a>
          <a href="mailto:eloreweddings@gmail.com">Email</a>
          <a
            href="https://instagram.com/eloreweddings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Elore Weddings. All rights reserved.</p>
        <p className="footer-credit">
          Website crafted by{" "}
          <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akshay Rajeevan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
