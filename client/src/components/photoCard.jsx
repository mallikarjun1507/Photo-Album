import React from 'react';

const PhotoCard = ({ photo, onDelete }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem",
      borderRadius: "8px",
      width: "250px"
    }}>
      <img
        src={`http://localhost:5000${photo.imageUrl}`}
        alt={photo.title}
        style={{ width: "100%", borderRadius: "5px" }}
      />
      <h4>{photo.title}</h4>
      <p>{photo.description}</p>
      <button onClick={() => onDelete(photo.id)}>Delete</button>
    </div>
  );
};

export default PhotoCard;
