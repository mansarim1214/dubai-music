import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import emailjs from "emailjs-com";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        console.log(`Fetching venue with ID: ${id}`); // Debug log
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/venues/${id}`
        );
        console.log('Fetched venue data:', response.data); // Debug log
        setVenue(response.data);
        setLoading(false); // Set loading to false on successful data fetch
      } catch (error) {
        console.error('Error fetching venue:', error);
        setError('Failed to fetch venue. Please try again later.'); // Update error state
        setLoading(false); // Set loading to false on error
      }
    };

    fetchVenue();
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
      venueName: venue?.title, // Ensure venue name is included
    };

    emailjs
      .send(
        "service_3hkljmf",
        "template_hg6yimn",
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

  if (loading) return <div>Loading...</div>; // Show loading indicator

  if (error) return <div>Error: {error}</div>; // Show error message if fetch fails

  if (!venue) return <div>No venue found.</div>; // Handle case when venue is null

  return (
    <div className="venue-detail bg-custom">
      <div className='container'>
        {venue.featuredImage && (
          <div className="venue-image">
            <img
              src={`${process.env.REACT_APP_API_URL}/${venue.featuredImage}`}
              alt={venue.title}
              width="100%"
            />
          </div>
        )}
        <h1>{venue.title}</h1>
        <div>Category: <span>{venue.category}</span></div>
        <div>Location: <span>{venue.location}</span></div>

        <div className='row mt-3' id='description'>
          <div className='col-md-6'>
            <div dangerouslySetInnerHTML={{ __html: venue.description || '<em>Description not available yet</em>' }} />
          </div>
          <div className='col-md-5'>
            {venue.gallery && venue.gallery.length > 0 && (
              <div className="venue-gallery">
                {venue.gallery.map((image, index) => (
                  <img key={index} src={`${process.env.REACT_APP_API_URL}/${image}`} alt={`Gallery ${index + 1}`} className="mb-2" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="artistForm mt-3">
          <h1 className="mx-2 my-2">Book this Venue</h1>
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

export default VenueDetail;
