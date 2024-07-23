import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVenue = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  
  const [venue, setVenue] = useState({
    title: '',
    description: '',
    location: '',
    featuredImage: '',
    category: 'Hidden Gems'
  });
  
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setVenue(prevState => ({ ...prevState, featuredImage: e.target.files[0] }));
  };

  const handleGalleryChange = (e) => {
    setGallery(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', venue.title);
    formData.append('description', venue.description);
    formData.append('location', venue.location);
    formData.append('category', venue.category);
    
    if (venue.featuredImage) {
      formData.append('featuredImage', venue.featuredImage);
    }
    
    for (let i = 0; i < gallery.length; i++) {
      formData.append('gallery', gallery[i]);
    }

    console.log('Form Data:', ...formData); // Log form data for debugging
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/venues`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Venue saved successfully:', response.data);
      setShowAlert(true); // Set showAlert to true on successful submission
      
      // Redirect to the venues dashboard or any other route after successful submission
      setTimeout(() => {
        setShowAlert(false);
        navigate('/venues'); // Replace with the appropriate route
      }, 3000);

    } catch (error) {
      console.error('Error saving venue:', error);
      // Handle error state or display error message to user
    }
  };

  return (
    <div className="add-venue">
      <h3>Add New Venue</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='mt-3'>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={venue.title}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={venue.description}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={venue.location}
            onChange={handleChange}
            required
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={venue.category}
            onChange={handleChange}
            required
            className='form-control'
          >
            <option value="Hidden Gems">Hidden Gems</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="form-group">
          <label>Featured Image</label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Gallery</label>
          <input
            type="file"
            name="gallery"
            multiple
            onChange={handleGalleryChange}
            className="form-control"
          />
        </div>

        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Venue added successfully!
            <button
              type="button"
              className="close"
              onClick={() => setShowAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className='btn btn-lg btn-dark mt-5'>Add Venue</button>
      </form>
    </div>
  );
};

export default AddVenue;
