const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const UncoSeries = require('../models/UncoSeries'); // Make sure this path is correct

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST route to add a new UncoSeries
router.post('/', upload.fields([{ name: 'featuredImage' }, { name: 'gallery' }]), async (req, res) => {
  const {
    epno,
    title,
    description,
    spotify,
    appleMusic,
    soundcloud,
    youtube
  } = req.body;

  const featuredImage = req.files['featuredImage']
    ? `uploads/${req.files['featuredImage'][0].filename}`
    : "";

  const gallery = req.files['gallery']?.map(file => `uploads/${file.filename}`) || [];

  try {
    const newUncoSeries = new UncoSeries({
      epno,
      title,
      description,
      featuredImage,
      gallery,
      spotify,
      appleMusic,
      soundcloud,
      youtube,
      createdAt: new Date()
    });

    await newUncoSeries.save();
    res.status(201).json(newUncoSeries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET route to fetch all UncoSeries entries
router.get('/', async (req, res) => {
  try {
    const uncoSeriesList = await UncoSeries.find();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const updatedList = uncoSeriesList.map(item => {
      const isNew = new Date(item.createdAt) >= sevenDaysAgo;
      return { ...item._doc, isNew };
    });

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT route to update an UncoSeries item
router.put('/:id', upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]), async (req, res) => {
  const {
    epno,
    title,
    description,
    spotify,
    appleMusic,
    soundcloud,
    youtube
  } = req.body;

  const updateData = {
    epno,
    title,
    description,
    spotify,
    appleMusic,
    soundcloud,
    youtube
  };

  try {
    if (req.files['featuredImage']) {
      updateData.featuredImage = `uploads/${req.files['featuredImage'][0].filename}`;
    }

    const uncoSeries = await UncoSeries.findById(req.params.id);
    if (!uncoSeries) {
      return res.status(404).json({ message: 'UncoSeries item not found' });
    }

    if (req.files['galleryImages']) {
      const newGalleryImages = req.files['galleryImages'].map(file => `uploads/${file.filename}`);
      updateData.gallery = [...uncoSeries.gallery, ...newGalleryImages];
    }

    const updatedItem = await UncoSeries.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating UncoSeries:', error.message);
    res.status(500).json({ message: 'Uncoernal Server Error', error: error.message });
  }
});


// GET route to fetch a single UncoSeries item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await UncoSeries.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'UncoSeries item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete an UncoSeries item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await UncoSeries.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'UncoSeries item not found' });
    }
    await UncoSeries.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'UncoSeries item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to remove a gallery image from the UncoSeries item's gallery
router.delete('/:id/gallery', async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    const item = await UncoSeries.findById(id);
    if (!item) return res.status(404).send('UncoSeries item not found');

    item.gallery = item.gallery.filter(img => img !== image);
    await item.save();
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
