const express = require('express');
const router = express.Router();
const multer = require('multer');
const Venue = require('../models/Venue'); // Ensure the correct path

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST route to create a new venue
router.post('/', upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
  // Log the request body and files
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);

  const { title, description, location, category } = req.body;

  // Validate the required fields
  if (!title || !description || !location || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const featuredImage = req.files && req.files['featuredImage'] ? `uploads/${req.files['featuredImage'][0].filename}` : '';
  const gallery = req.files && req.files['gallery'] ? req.files['gallery'].map(file => `uploads/${file.filename}`) : [];

  const newVenue = new Venue({
    title,
    description,
    location,
    category,
    featuredImage,
    gallery
  });

  try {
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update a venue by id

router.put('/:id', upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), async (req, res) => {
  try {
    const venueId = req.params.id;
    console.log('Updating venue with ID:', venueId); // Log the ID received in the request

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const { title, description, location, category } = req.body;
    const featuredImage = req.files && req.files['featuredImage'] ? `uploads/${req.files['featuredImage'][0].filename}` : venue.featuredImage;
    const gallery = req.files && req.files['gallery'] ? req.files['gallery'].map(file => `uploads/${file.filename}`) : venue.gallery;

    venue.title = title || venue.title;
    venue.description = description || venue.description;
    venue.location = location || venue.location;
    venue.category = category || venue.category;
    venue.featuredImage = featuredImage;
    venue.gallery = gallery;

    const updatedVenue = await venue.save();
    res.status(200).json(updatedVenue);
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(400).json({ message: error.message });
  }
});


// DELETE route to delete a venue by id
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    await venue.remove();
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
