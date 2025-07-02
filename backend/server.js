const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Import routes
const categoriesRoute = require('./routes/categories');
const artistsRoute = require('./routes/artists');
const venuesRoute = require('./routes/venues');
const musicStore = require('./routes/musicstore');
const weddingvip = require('./routes/weddingvip')
const intseries = require('./routes/intseries');


// Use routes
app.use('/api/categories', categoriesRoute);
app.use('/api/artists', artistsRoute);
app.use('/api/venues', venuesRoute);
app.use('/api/musicstore', musicStore);
app.use('/api/weddingvip', weddingvip);
app.use('/api/intseries', intseries)
 

mongoose.connect('mongodb+srv://mansarim:4TCOflsMWdI9CCkt@cluster0.fawjsqk.mongodb.net/dubaimusic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Dubai Music API');
});


app.use(express.static('public', {
  setHeaders: (res, path) => {
      if (path.endsWith('.woff2')) {
          res.setHeader('Content-Type', 'font/woff2');
      }
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
