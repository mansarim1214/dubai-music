import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const EditArtist = ({ artist, setEditArtist, setShowAlert }) => {
  const [title, setTitle] = useState(artist.title);
  const [category, setCategory] = useState(artist.category);
  const [speciality, setSpeciality] = useState(artist.speciality);
  const [description, setDescription] = useState(artist.description);
  const [videoUrl, setVideoUrl] = useState(artist.videoUrl);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("speciality", speciality);
    formData.append("description", description);
    formData.append("videoUrl", videoUrl);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/artists/${artist._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Artist updated:", response.data);
      setShowAlert(true);
      setEditArtist(null);
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  return (
<>

    <h3>Edit Artist</h3>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
          <label htmlFor="name">Speciality</label>
          <input
            type="text"
            className="form-control"
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            placeholder="Artist Speciality"
            required
          />
        </div>
      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <CKEditor
          editor={ClassicEditor}
          data={description}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
          config={{
            placeholder: "Enter artist bio",
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="videoUrl">Video URL</label>
        <input
          type="text"
          className="form-control"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter video URL"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Artist Photo</label>
        <div className="custom-file-input-wrapper">
          <input
            type="file"
            className="form-control-file"
            id="image"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => document.getElementById("image").click()}
          >
            Upload Photo
          </button>
          <span id="file-name">{fileName}</span>
        </div>
      </div>
      <button type="submit" className="btn btn-lg btn-dark mt-5">
        Update Artist
      </button>
      <button type="button" className="btn btn-secondary ml-3 mt-5" onClick={() => setEditArtist(null)}>
        Cancel
      </button>
    </form>

    </>

  );
};

export default EditArtist;
