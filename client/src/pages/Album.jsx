import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from '../components/photoCard';

const Album = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch photos from backend
  const fetchPhotos = async () => {
    try {
      const res = await axios.get('/api/photos');
      setPhotos(res.data);
    } catch (err) {
      console.error(' Fetch error:', err);
    }
  };

  // Upload photo
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a photo to upload");

    const formData = new FormData();
    formData.append('photo', file); 
    formData.append('title', title);
    formData.append('description', description);

    try {
      setLoading(true);
      const response = await axios.post('/api/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(' Upload response:', response.data);

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      e.target.reset(); 
      fetchPhotos();
    } catch (err) {
      console.error(' Upload error:', err.response?.data || err.message);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Delete photo by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/photos/${id}`);
      fetchPhotos();
    } catch (err) {
      console.error(' Delete error:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Upload Photo</h2>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <h3 style={{ marginTop: "2rem" }}>Photo Album</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {photos.length === 0 && <p>No photos found.</p>}
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Album;
