import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  // 🔹 Form state
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  // 🔹 Data state
  const [imageUrls, setImageUrls] = useState([]);
  const [albums, setAlbums] = useState([]);

  // 🔹 UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const snapshot = await getDocs(collection(db, "weddings"));
    setAlbums(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };


  const setCoverPhoto = async (albumId, imgUrl) => {
    await updateDoc(doc(db, "weddings", albumId), {
      coverImage: imgUrl,
    });

    setAlbums(
      albums.map(a =>
        a.id === albumId ? { ...a, coverImage: imgUrl } : a
      )
    );
  };

  // 🔹 Upload to Cloudinary
  const uploadToCloudinary = async (files) => {
    const urls = [];

    for (const file of files) {
      const compressed = await imageCompression(file, {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", "Weddings");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmjrqytgd/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");

      urls.push(data.secure_url);
    }

    return urls;
  };

  // 🔹 Upload images (preview stage)
  const uploadImages = async () => {
    if (images.length === 0) {
      setError("Please select images");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const urls = await uploadToCloudinary(images);
      setImageUrls(urls);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Save album
  const saveAlbum = async () => {
    if (!category || imageUrls.length === 0) {
      setError("Select a category and upload images");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "weddings"), {
        category,
        images: imageUrls,
        coverImage: imageUrls[0],
        createdAt: serverTimestamp(),
      });

      setCategory("");
      setImages([]);
      setImageUrls([]);
      fetchAlbums();
    } catch {
      setError("Failed to save album");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add photos to existing album
  const addPhotosToAlbum = async (albumId, files) => {
    if (!files.length) return;

    setLoading(true);
    const newUrls = await uploadToCloudinary(files);

    const album = albums.find(a => a.id === albumId);
    const updatedImages = [...album.images, ...newUrls];

    await updateDoc(doc(db, "weddings", albumId), {
      images: updatedImages,
    });

    setAlbums(
      albums.map(a =>
        a.id === albumId ? { ...a, images: updatedImages } : a
      )
    );

    setLoading(false);
  };

  // 🔹 Update category
  const updateCategory = async (id, value) => {
    await updateDoc(doc(db, "weddings", id), { category: value });

    setAlbums(
      albums.map(a =>
        a.id === id ? { ...a, category: value } : a
      )
    );
  };

  // 🔹 Delete album
  const deleteAlbum = async (id) => {
    if (!window.confirm("Delete this album?")) return;
    await deleteDoc(doc(db, "weddings", id));
    setAlbums(albums.filter(a => a.id !== id));
  };

  // 🔹 Delete photo
  const deletePhoto = async (albumId, imgUrl) => {
    const album = albums.find(a => a.id === albumId);
    const updatedImages = album.images.filter(i => i !== imgUrl);

    await updateDoc(doc(db, "weddings", albumId), {
      images: updatedImages,
      coverImage: updatedImages[0] || "",
    });

    setAlbums(
      albums.map(a =>
        a.id === albumId
          ? { ...a, images: updatedImages, coverImage: updatedImages[0] }
          : a
      )
    );
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* CREATE ALBUM */}
      <div className="create-section">
        <h3>Create Event Album</h3>

        <label>Event Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option>Christian Wedding</option>
          <option>Hindu Wedding</option>
          <option>Varmala Ceremony</option>
          <option>Birthday</option>
          <option>Family Function</option>
          <option>Engagement</option>
          <option>Muslim Wedding</option>
          <option>Pre Wedding</option>
        </select>

        <label>Upload Photos</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />

        <button onClick={uploadImages} disabled={loading}>
          Upload Images
        </button>

        <button
          onClick={saveAlbum}
          disabled={loading || imageUrls.length === 0}
        >
          Save Album
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      <hr />

      {/* EXISTING ALBUMS */}
      <h3>Existing Albums</h3>

      {albums.map(album => (
        <div key={album.id} className="album-card">
          <input
            value={album.category}
            onChange={(e) =>
              updateCategory(album.id, e.target.value)
            }
          />

          <p>Add More Photos</p>

          <input
            type="file"
            multiple
            onChange={(e) =>
              addPhotosToAlbum(album.id, [...e.target.files])
            }
          />

          <button onClick={() => deleteAlbum(album.id)}>
            Delete Album
          </button>

          <div className="photo-grid">
            {album.images.map(img => (
              <div key={img} className="photo-item">
                <img src={img} alt="event" />
                <button
                  className="btn-cover"
                  onClick={() => setCoverPhoto(album.id, img)}
                >
                  Set Cover
                </button>
                <button onClick={() => deletePhoto(album.id, img)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
