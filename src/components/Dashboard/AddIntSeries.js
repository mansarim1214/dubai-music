import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddIntSeries = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [intSeries, setIntSeries] = useState({
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
    setIntSeries((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setIntSeries((prevState) => ({ ...prevState, description: data }));
  };

  const handleFileChange = (e) => {
    setIntSeries((prevState) => ({
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
    Object.entries(intSeries).forEach(([key, value]) => {
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
        `${process.env.REACT_APP_API_URL}/api/intseries`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Introducing Series saved successfully:", response.data);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error saving IntSeries:", error);
    }
  };

  return (
    <div className="add-intseries">
      <h3>Add New Introducing Series</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-3">
        <div className="form-group">
          <label>Ep#</label>
          <input
            type="text"
            name="epno"
            value={intSeries.epno}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={intSeries.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={intSeries.description}
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
            value={intSeries.spotifyUrl}
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
            value={intSeries.appleMusicUrl}
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
            value={intSeries.soundcloudUrl}
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
            value={intSeries.youtubeUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://youtube.com/..."
          />
        </div>

        {showAlert && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            IntSeries added successfully!
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

export default AddIntSeries;
