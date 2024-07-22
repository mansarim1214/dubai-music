const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Artist = require('../models/Artist');


// Mongoose schema definition
const artistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  speciality: { type: String, required: true },
  description: { type: String},
  videoUrl: { type: String, required: false },
  imageUrl: { type: String, required: true }
});

// Mongoose model based on the schema
// const Artist = mongoose.model('Artist', artistSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST route to add a new artist
router.post('/', upload.single('image'), async (req, res) => {
  const { title, category, speciality, description, videoUrl } = req.body;
  const imageUrl = `uploads/${req.file.filename}`; // Constructing imageUrl path
  try {
    // Create a new artist instance using Mongoose model
    const newArtist = new Artist({ title, category, speciality, description, videoUrl, imageUrl });
    await newArtist.save(); // Save artist to database
    res.status(201).json(newArtist); // Respond with the saved artist object
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any validation or database errors
  }
});

// GET route to fetch all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find(); // Fetch all artists from database
    res.json(artists); // Respond with array of artists
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server or database errors
  }
});

// GET route to fetch a single artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id); // Find artist by ID
    if (artist) {
      res.json(artist); // Respond with the artist object if found
    } else {
      res.status(404).json({ message: 'Artist not found' }); // Handle case where artist ID is not found
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server or database errors
  }
});


// Add these routes to your existing routes file (artists.js)

// PUT route to update an artist by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, category, speciality, description, videoUrl } = req.body;
  const updateData = { title, category, speciality, description, videoUrl };

  if (req.file) {
    updateData.imageUrl = `uploads/${req.file.filename}`;
  }

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (updatedArtist) {
      res.json(updatedArtist);
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete an artist by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (deletedArtist) {
      res.json({ message: 'Artist deleted successfully' });
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
