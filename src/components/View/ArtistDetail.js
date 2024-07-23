import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import emailjs from "emailjs-com";

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/artists/${id}`
        );
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      artistName: artist?.title, // Ensure artist name is included
    };

    emailjs
      .send(
        "service_3hkljmf",
        "template_tg0y1rn",
        templateParams,
        "q1l_DC7jwQvu80xJ5"
      )
      .then((response) => {
        setFormMessage("Booking request sent successfully!");
        setFormData({ name: "", phone: "", email: "" });
      })
      .catch((error) => {
        setFormMessage("Failed to send booking request. Please try again.");
        console.error("Error sending booking request:", error);
      });
  };

  if (!artist) return <div>Loading...</div>;

  return (
    <div className="artist-detail bg-custom">
      <div className="container">
        {artist.videoUrl && (
          <div className="artist-video">
            <iframe
              width="100%"
              height="500"
              src={`${artist.videoUrl.replace(
                "watch?v=",
                "embed/"
              )}?rel=0&modestbranding=0showinfo=0controls=0`}
              title={artist.title}
              frameBorder="0"
            ></iframe>
          </div>
        )}
        <h1>{artist.title}</h1>
        <div>
          Category: <span>{artist.category}</span>
        </div>
        <div>
          Speciality: <span>{artist.speciality}</span>
        </div>

        <div id="description" className="mt-3">
          <div className="row ">
            <div className="col-md-6">
              <h4>Bio</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    artist.description ||
                    "<em>Description not available yet</em>",
                }}
              />
            </div>
            <div className="col-md-5">
              {artist.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${artist.imageUrl}`}
                  alt={artist.title}
                  className="artist-image mb-2"
                />
              )}
            </div>
          </div>
        </div>

        <div className="artistForm mt-3">
          <h1 className="mx-2 my-2">Book this Artist</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                 
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
            <div className="form-group">
            
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
            </div>
            </div>
            <div className="col-md-6">
            <button type="submit" className="btn btn-danger enquirybtn">
              Enquire Now
            </button>
            </div>
            </div>
          </form>
          {formMessage && <p className="form-message">{formMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
