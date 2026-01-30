import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Stories.css";

const Stories = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "weddings"),
      orderBy("createdAt", "desc") // ✅ updated
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAlbums(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="stories-container" id="stories">
      <div className="stories-header">
        <h1>Our Stories</h1>
        <p>Weddings, celebrations & timeless moments</p>
      </div>

      <div className="stories-grid">
        {albums.map((album) => (
          <div
            key={album.id}
            className="story-card"
            onClick={() => navigate(`/album/${album.id}`)}
          >
            <img
              src={album.coverImage}
              alt={album.category}
              className="story-image"
            />

            <div className="story-overlay">
              <h3>{album.category}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
