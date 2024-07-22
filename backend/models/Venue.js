const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({

  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  featuredImage: { type: String, required: true },
  gallery: { type: String, required: false },
});



const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;