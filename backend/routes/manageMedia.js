const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Artist = require('../models/Artist');
const Venue = require('../models/Venue');
const IntSeries = require('../models/IntSeries');
const MusicStore = require('../models/MusicStore');
const Weddingvip = require('../models/WeddingVip');

const uploadDir = path.join(__dirname, '../uploads');

const getImageUsageMap = async () => {
  const usage = {};

  const track = (imgPath, modelName) => {
    if (imgPath && typeof imgPath === 'string') {
      const cleaned = path.basename(imgPath.trim().split('?')[0]);
      if (!usage[cleaned]) usage[cleaned] = new Set();
      usage[cleaned].add(modelName);

     
    }
  };

  const trackArray = (arr, modelName) => {
    if (Array.isArray(arr)) {
      arr.forEach(img => track(img, modelName));
    }
  };

  // Import models
  const intSeries = await IntSeries.find();
  intSeries.forEach(s => {
    track(s.featuredImage, "IntSeries");
    trackArray(s.gallery, "IntSeries");
  });

  const artists = await Artist.find();
  artists.forEach(a => {
    track(a.imageUrl, "Artist");
    trackArray(a.galleryImages, "Artist");
  });

  const venues = await Venue.find();
  venues.forEach(v => {
    track(v.featuredImage, "Venue");
    trackArray(v.gallery, "Venue");
  });

  const weddingvips = await Weddingvip.find();
  weddingvips.forEach(w => {
    track(w.imageUrl, "WeddingVip");
    trackArray(w.gallery, "WeddingVip");
  });

  const stores = await MusicStore.find();
  stores.forEach(s => {
    track(s.imageUrl, "MusicStore");
    trackArray(s.gallery, "MusicStore");
  });

  return usage;
};


router.get('/', async (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map(file => {
        const fullPath = path.join(uploadDir, file);
        const stat = fs.statSync(fullPath);
        return {
          file,
          url: `/uploads/${file}`,
          mtime: stat.mtime // modified time
        };
      })
      .sort((a, b) => b.mtime - a.mtime); // Sort: most recent first

    // Attach usage info
    const usageMap = await getImageUsageMap();
    const result = files.map(({ file, url }) => ({
      file,
      url,
      usedBy: usageMap[file] ? Array.from(usageMap[file]) : []
    }));

    res.json(result);
  } catch (err) {
    console.error("Error in /api/media:", err);
    res.status(500).json({ error: "Unable to read upload directory or models." });
  }
});


router.delete('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  try {
    const usageMap = await getImageUsageMap();
    if (usageMap[filename]) {
      return res.status(400).json({ error: 'File is in use and cannot be deleted.' });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true });
    } else {
      return res.status(404).json({ error: 'File not found.' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal error deleting file.' });
  }
});


module.exports = router;
