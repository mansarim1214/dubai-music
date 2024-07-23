import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const EditVenue = ({ venue, setEditVenue, setShowAlert }) => {
  const [title, setTitle] = useState(venue.title);
  const [description, setDescription] = useState(venue.description);
  const [location, setLocation] = useState(venue.location);
  const [category, setCategory] = useState(venue.category);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [galleryNames, setGalleryNames] = useState([]);

  useEffect(() => {
    // Initialize gallery names from existing gallery images
    if (venue.gallery) {
      setGalleryNames(venue.gallery.map((image) => image.split('/').pop()));
    }
  }, [venue.gallery]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.id === 'featuredImage') {
      setFeaturedImage(file);
      setFileName(file ? file.name : "No file chosen");
    } else if (e.target.id === 'gallery') {
      setGallery([...gallery, file]);
      setGalleryNames([...galleryNames, file.name]);
    }
  };

  const handleRemoveGalleryImage = (index) => {
    const updatedGallery = [...gallery];
    updatedGallery.splice(index, 1);
    setGallery(updatedGallery);

    const updatedGalleryNames = [...galleryNames];
    updatedGalleryNames.splice(index, 1);
    setGalleryNames(updatedGalleryNames);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", category);
    if (featuredImage) formData.append("featuredImage", featuredImage);
    gallery.forEach((file, index) => formData.append(`gallery`, file));

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/venues/${venue._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Venue updated:", response.data);
      setShowAlert(true);
      setEditVenue(null);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  return (
    <div className="edit-venue">
      <h3>Edit Venue</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-control"
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
          <div className="custom-file-input-wrapper">
            <input
              type="file"
              className="form-control-file"
              id="featuredImage"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => document.getElementById("featuredImage").click()}
            >
              Upload Photo
            </button>
            <span id="file-name">{fileName}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Gallery</label>
          <div className="custom-file-input-wrapper">
            <input
              type="file"
              className="form-control-file"
              id="gallery"
              multiple
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => document.getElementById("gallery").click()}
            >
              Upload Photos
            </button>
            <span id="file-names">{galleryNames.join(', ')}</span>
          </div>
          {galleryNames.length > 0 && (
            <div className="mt-2">
              {galleryNames.map((name, index) => (
                <div key={index} className="d-flex align-items-center">
                  <span>{name}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => handleRemoveGalleryImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-lg btn-dark mt-5">
          Update Venue
        </button>
      </form>
    </div>
  );
};

export default EditVenue;
