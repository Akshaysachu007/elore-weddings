import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Stories.css";

const Stories = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Cloudinary Optimization Helper
   * f_auto: Automatically serves WebP/AVIF
   * q_auto: Compresses based on visual quality
   * w_600: Resizes to a smaller width suitable for grid cards
   * c_fill: Crops the image to fill the card dimensions
   */
  const getOptimizedUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_600,c_fill,g_auto/");
  };

  useEffect(() => {
    // Note: If this fails on localhost/Vercel, check the browser console 
    // for the link to create the 'createdAt' index.
    const q = query(
      collection(db, "weddings"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const fetchedAlbums = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlbums(fetchedAlbums);
        setLoading(false);
      }, 
      (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="stories-container" id="stories">
      <div className="stories-header">
        <h1>Our Stories</h1>
        <p>Weddings, celebrations & timeless moments</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading beautiful moments...</div>
      ) : (
        <div className="stories-grid">
          {albums.length > 0 ? (
            albums.map((album) => (
              <div
                key={album.id}
                className="story-card"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img
                  // Using the optimizer here makes the images load much faster
                  src={getOptimizedUrl(album.coverImage)}
                  alt={album.category || "Wedding Story"}
                  className="story-image"
                  loading="lazy" // Browsers will only load images near the screen
                />

                <div className="story-overlay">
                  <h3>{album.category}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No stories found. Please check your Firestore collection.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stories;