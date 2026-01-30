import "../styles/Packages.css";
import { FiDownload } from "react-icons/fi";

const PackageCard = ({ data }) => {
  return (
    <div className="package-card">
      <h2 className="package-title">{data.title}</h2>
      <p className="package-price">{data.price}</p>

      <div className="package-block">
        <h4>Coverage</h4>
        <ul>
          {data.coverage.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="package-block">
        <h4>Deliverables</h4>
        <ul>
          {data.deliverables.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <a
        href={data.brochureUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      ><FiDownload />
        Download Brochure
      </a>
    </div>
  );
};

export default PackageCard;
