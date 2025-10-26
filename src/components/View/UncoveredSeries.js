import React, { useState, useEffect } from "react";
import axios from "axios";
import "./frontend.css";

const UncoSeriesList = ({ onNavigate }) => {
  const [uncoSeriesList, setUncoSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUncoSeries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/uncoseries`);
        setUncoSeriesList(response.data);
      } catch (error) {
        setError("Failed to fetch UncoSeries. Please try again later.");
        console.error("Error fetching UncoSeries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUncoSeries();
  }, []);

  const handleClick = (item) => {
    if (onNavigate) {
      onNavigate(`/uncoveredseries-detail/${item._id}`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bg-custom" >
      <h2 className="my-2 fav-title">Uncovered Series</h2>
      <div className="container-fluid">
        <div className="storeGrid">
          {uncoSeriesList.map((item) => (
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

export default UncoSeriesList;
