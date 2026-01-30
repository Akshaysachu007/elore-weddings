import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { FiCheck, FiX, FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";
import "../styles/Album.css";

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAlbum = async () => {
      const snap = await getDoc(doc(db, "weddings", id));
      if (snap.exists()) {
        setAlbum(snap.data());
      }
    };
    fetchAlbum();
  }, [id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;


    const navigateNext = () => {
      if (!album) return;
      setCurrentImageIndex((prev) =>
        prev === album.images.length - 1 ? 0 : prev + 1
      );
    };

    const navigatePrev = () => {
      if (!album) return;
      setCurrentImageIndex((prev) =>
        prev === 0 ? album.images.length - 1 : prev - 1
      );
    };


    const closeLightbox = () => {
      setLightboxOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImageIndex , album]);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedImages(new Set());
  };

  const toggleImageSelection = (imageUrl, e) => {
    e.stopPropagation();
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageUrl)) {
      newSelected.delete(imageUrl);
    } else {
      newSelected.add(imageUrl);
    }
    setSelectedImages(newSelected);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  

    const navigateNext = () => {
      if (!album) return;
      setCurrentImageIndex((prev) =>
        prev === album.images.length - 1 ? 0 : prev + 1
      );
    };

    const navigatePrev = () => {
      if (!album) return;
      setCurrentImageIndex((prev) =>
        prev === 0 ? album.images.length - 1 : prev - 1
      );
    };


  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${album.coupleName.replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const downloadSelected = async () => {
    for (const imageUrl of selectedImages) {
      await downloadImage(imageUrl);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
    }
    setSelectedImages(new Set());
    setSelectMode(false);
  };

  if (!album) {
    return (
      <div className="album-loading">
        <div className="spinner"></div>
        <p>Loading Album...</p>
      </div>
    );
  }

  return (
    <div className="album-container">
      {/* Header */}
      <div className="album-header">
        <h1>{album.category}</h1>
        
      </div>

      {/* Controls */}
      <div className="album-controls">
        <div className="control-left">
          <button
            className={`select-mode-btn ${selectMode ? "active" : ""}`}
            onClick={toggleSelectMode}
          >
            {selectMode ? <FiCheck /> : null}
            {selectMode ? "Select Mode On" : "Select Images"}
          </button>
          {selectMode && selectedImages.size > 0 && (
            <span className="selected-count">
              {selectedImages.size} selected
            </span>
          )}
        </div>
        <button
          className="download-btn"
          onClick={downloadSelected}
          disabled={selectedImages.size === 0}
        >
          <FiDownload />
          Download {selectedImages.size > 0 ? `(${selectedImages.size})` : ""}
        </button>
      </div>

      {/* Image Grid */}
      <div className={`album-grid ${selectMode ? "select-mode" : ""}`}>
        {album.images.map((img, index) => (
          <div
            key={img}
            className={`image-card ${selectedImages.has(img) ? "selected" : ""}`}
            onClick={() => !selectMode && openLightbox(index)}
          >
            <img src={img} alt={`${album.coupleName} - ${index + 1}`} />
            {selectMode && (
              <div
                className={`image-checkbox ${selectedImages.has(img) ? "checked" : ""}`}
                onClick={(e) => toggleImageSelection(img, e)}
              >
                {selectedImages.has(img) && <FiCheck />}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox/Slideshow */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={album.images[currentImageIndex]}
              alt={`${album.coupleName} - ${currentImageIndex + 1}`}
              className="lightbox-image"
            />
          </div>

          <button className="lightbox-close" onClick={closeLightbox}>
            <FiX />
          </button>

          <button className="lightbox-nav prev" onClick={navigatePrev}>
            <FiChevronLeft />
          </button>

          <button className="lightbox-nav next" onClick={navigateNext}>
            <FiChevronRight />
          </button>

          <button
            className="lightbox-download"
            onClick={() => downloadImage(album.images[currentImageIndex])}
          >
            <FiDownload />
          </button>

          <div className="lightbox-counter">
            {currentImageIndex + 1} / {album.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
