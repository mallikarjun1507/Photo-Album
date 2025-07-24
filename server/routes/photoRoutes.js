const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

const router = express.Router();

// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a photo
router.post('/upload', upload.single('photo'), async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const [result] = await db.query(
      'INSERT INTO photos (title, description, imageUrl) VALUES (?, ?, ?)',
      [title, description, imageUrl]
    );
    res.status(200).json({ message: 'Photo uploaded successfully', photoId: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ message: 'Database insert failed' });
  }
});

//  Get all photos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM photos');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching photos' });
  }
});

//  Delete photo by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM photos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete photo' });
  }
});

module.exports = router;
