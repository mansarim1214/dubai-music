import React, { useState, useEffect } from "react";
import axios from "axios";
import "./frontend.css";

const IntSeriesList = ({ onNavigate }) => {
  const [intSeriesList, setIntSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntSeries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/intseries`);
        setIntSeriesList(response.data);
      } catch (error) {
        setError("Failed to fetch IntSeries. Please try again later.");
        console.error("Error fetching IntSeries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntSeries();
  }, []);

  const handleClick = (item) => {
    if (onNavigate) {
      onNavigate(`/introducingseries-detail/${item._id}`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bg-custom">
      <h2 className="my-2 fav-title">Introducing Series</h2>
      <div className="container-fluid">
        <div className="storeGrid">
          {intSeriesList.map((item) => (
            <div
              key={item._id}
              className="storeCard"
              style={{ textAlign: "center", padding: "10px" }}
              onClick={() => handleClick(item)}
            >
              <div className="storeImage">
                {item.featuredImage ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${item.featuredImage}`}
                    alt={item.title}
                    width="100%"
                    loading="lazy"
                  />
                ) : (
                  <div className="image-placeholder"></div>
                )}
                {item.isNew && <span className="newLabel">Recently Added</span>}
                <div className="storeContent">
                  <h4 className="artTitle">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntSeriesList;
