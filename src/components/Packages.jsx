import PackageCard from "./PackageCard";
import "../styles/Packages.css";



const Packages = () => {

    const handleScrollBookings = () => {
    const section = document.getElementById('contact');
    section.scrollIntoView({ behavior: 'smooth' });
  }
  
  const packages = [
    {
      title: "Classic Wedding Package",
      price: "₹75,000",
      brochureUrl: "https://res.cloudinary.com/dmjrqytgd/image/upload/v1769743135/WhatsApp_Image_2026-01-29_at_12.54.51_PM_zb6u1t.jpg",
      coverage: [
        "Pre Wedding Shoot (1 Photo)",
        "Wedding Day (2 Photo + 2 Video)",
        "Wedding Eve (1 Photo + 1 Video)",
        "Wedding Reception (1 Photo + 1 Video)",
      ],
      deliverables: [
        "Pre Wedding Reel – 30 sec",
        "Wedding Reel – 30 sec",
        "10 Edited Photos (Each Event)",
        "Wedding Highlights (2–4 min)",
        "Full Wedding Video (30–60 min)",
        "Album – 35 Leaf + Carry Bag",
        "Mini Album",
        "2 Photo Laminations",
        "Wall Calendar",
        "Pendrive Boxes",
        "Same Day Wedding Reel",
      ],
    },
    {
      title: "Premium Wedding Package",
      price: "₹90,000",
      brochureUrl: "https://res.cloudinary.com/dmjrqytgd/image/upload/v1769743134/WhatsApp_Image_2026-01-29_at_12.54.51_PM_1_d34vei.jpg",
      coverage: [
        "Pre Wedding Shoot (1 Photo + 1 Video)",
        "Wedding Day (2 Photo + 2 Video)",
        "Wedding Eve (1 Photo + 1 Video)",
        "Wedding Reception (1 Photo + 1 Video)",
      ],
      deliverables: [
        "Pre Wedding Video – 60–90 sec",
        "Pre Wedding Reel – 30 sec",
        "Wedding Reel – 30 sec",
        "20 Edited Photos (Each Event)",
        "Wedding Highlights (2–4 min)",
        "Full Wedding Video (30–60 min)",
        "Album – 45 Leaf + Carry Bag",
        "Mini Album",
        "Magic Mug",
        "2 Photo Laminations",
        "Wall Calendar",
        "Pendrive Boxes",
        "Same Day Wedding Reel",
      ],
    },
  ];

  return (
    <section className="packages-section" id="packages">
      <div className="packages-header">
        <h1>Our Wedding Packages</h1>
        <p>Thoughtfully crafted for timeless memories</p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg, i) => (
          <PackageCard key={i} data={pkg} />
        ))}
      </div>
        
       <h1 className="header-text">For Bookings & Enquiries</h1> 
        <button
        className="cta-btn"
        onClick={handleScrollBookings}
        >
        Contact Us
        </button>
      
    
    </section>

    

  );
};

export default Packages;
