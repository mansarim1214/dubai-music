import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import WelcomeModal from "./WelcomeModal";
import { Link } from "react-router-dom";
import "./frontend.css";

gsap.registerPlugin(Draggable);

const IntSeriesList = ({ onNavigate }) => {
  const [intSeriesList, setIntSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRefs = useRef([]);

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

  const scrollCarousel = (direction, index) => {
    const carousel = carouselRefs.current[index];
    if (carousel) {
      const item = carousel.querySelector(".intImage");
      const itemWidth = item ? item.clientWidth : 0;
      const scrollAmount = itemWidth * 3;

      let newScrollPosition = carousel.scrollLeft + scrollAmount * direction;
      newScrollPosition = Math.max(
        0,
        Math.min(newScrollPosition, carousel.scrollWidth - carousel.clientWidth)
      );

      gsap.to(carousel, {
        scrollLeft: newScrollPosition,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleClick = (item) => {
    if (onNavigate) {
      onNavigate(`/introducingseries-detail/${item._id}`);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="bg-custom">
     
      <div className="container-fluid p-0">
        <div className="category-wrapper">
          <h2 className="my-4 fav-title">Introducing Series</h2>
          <hr />
          <div className="row">
            <div className="col p-relative">
              <div
                className="intCarousel"
                ref={(el) => (carouselRefs.current[0] = el)}
                style={{
                  display: "flex",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                {intSeriesList.map((item) => (
                  <div
                    key={item._id}
                    className="artistImage"
                    style={{ flex: "0 0 16.67%", padding: "0 5px" }}
                  >
                    <div onClick={() => handleClick(item)}>
                      <div className="artistImage">
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
                        {item.isNew && (
                          <span className="newLabel">Recently Added</span>
                        )}
                        <div className="artContent">
                          <h4 className="artTitle">{item.title}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Optional Carousel Arrows (Uncomment if needed) */}
              {/* <button className="arrow left" onClick={() => scrollCarousel(-1, 0)}>
                <BsChevronCompactLeft />
              </button>
              <button className="arrow right" onClick={() => scrollCarousel(1, 0)}>
                <BsChevronCompactRight />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntSeriesList;
