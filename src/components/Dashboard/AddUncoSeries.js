import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddUncoSeries = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [uncoSeries, setUncoSeries] = useState({
    epno: "",
    title: "",
    description: "",
    featuredImage: "",
    spotifyUrl: "",
    appleMusicUrl: "",
    soundcloudUrl: "",
    youtubeUrl: "",
  });
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUncoSeries((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setUncoSeries((prevState) => ({ ...prevState, description: data }));
  };

  const handleFileChange = (e) => {
    setUncoSeries((prevState) => ({
      ...prevState,
      featuredImage: e.target.files[0],
    }));
  };

  const handleGalleryChange = (e) => {
    setGallery(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(uncoSeries).forEach(([key, value]) => {
      if (key === "featuredImage" && value) {
        formData.append("featuredImage", value);
      } else {
        formData.append(key, value);
      }
    });

    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/uncoseries`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Uncovered Series saved successfully:", response.data);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error saving UncoSeries:", error);
    }
  };

  return (
    <div className="add-uncoseries">
      <h3>Add New Uncovered Series</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-3">
        <div className="form-group">
          <label>Ep#</label>
          <input
            type="text"
            name="epno"
            value={uncoSeries.epno}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={uncoSeries.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={uncoSeries.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="form-group">
          <label>Featured Image</label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleFileChange}
            className="form-control"
            required
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

        {/* 🎵 Streaming Links */}
        <div className="form-group">
          <label>Spotify URL</label>
          <input
            type="url"
            name="spotifyUrl"
            value={uncoSeries.spotifyUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://open.spotify.com/..."
          />
        </div>

        <div className="form-group">
          <label>Apple Music URL</label>
          <input
            type="url"
            name="appleMusicUrl"
            value={uncoSeries.appleMusicUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://music.apple.com/..."
          />
        </div>

        <div className="form-group">
          <label>SoundCloud URL</label>
          <input
            type="url"
            name="soundcloudUrl"
            value={uncoSeries.soundcloudUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://soundcloud.com/..."
          />
        </div>

        <div className="form-group">
          <label>YouTube URL</label>
          <input
            type="url"
            name="youtubeUrl"
            value={uncoSeries.youtubeUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://youtube.com/..."
          />
        </div>

        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            UncoSeries added successfully!
            <button type="button" className="close" onClick={() => setShowAlert(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-dark mt-4">
          Add Series
        </button>
      </form>
    </div>
  );
};

export default AddUncoSeries;
