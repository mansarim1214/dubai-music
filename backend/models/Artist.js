const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  speciality: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: false },
  imageUrl: { type: String, required: true },
  
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
