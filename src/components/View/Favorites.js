import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { BsHeartFill } from "react-icons/bs";
import "./frontend.css";

const Favorites = () => {
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  useEffect(() => {
    const fetchFavoriteArtists = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteArtists')) || {};
      const favoriteArtistIds = Object.keys(storedFavorites);

      try {
        const responses = await Promise.all(
          favoriteArtistIds.map(artistId => axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${artistId}`))
        );
        const fetchedArtists = responses.map(response => response.data);
        setFavoriteArtists(fetchedArtists);
      } catch (error) {
        console.error('Error fetching favorite artists:', error);
      }
    };

    fetchFavoriteArtists();
  }, []);

  const toggleFavorite = (artistId) => {
    const updatedFavoriteArtists = favoriteArtists.filter(artist => artist._id !== artistId);
    setFavoriteArtists(updatedFavoriteArtists);

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteArtists')) || {};
    delete storedFavorites[artistId];
    localStorage.setItem('favoriteArtists', JSON.stringify(storedFavorites));
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <div className="bg-custom">
      <div className="container-fluid">
        <h2 className="mb-3 fav-title">Artists You've Favorited</h2>
        {favoriteArtists.length === 0 ? (
          <p>No favorite added yet!</p>
        ) : (
          <div className="row">
            <div className="col no-gutter">
              <MultiCarousel responsive={responsive}>
                {favoriteArtists.map((artist) => (
                  <div key={artist._id} className="favorite-artist">
                    <span
                      className="favorite favorited"
                      onClick={() => toggleFavorite(artist._id)}
                      style={{ color: 'red' }}
                    >
                      <BsHeartFill />
                    </span>
                    <Link to={`/artist/${artist._id}`}>
                      <div className="artistImage">
                        {artist.imageUrl && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${artist.imageUrl}`}
                            alt={artist.title}
                            width="100%"
                            loading="lazy"
                          />
                        )}
                        <div className="artContent">
                          <h4 className="artTitle">{artist.title}</h4>
                          <span className="speciality">{artist.speciality}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </MultiCarousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
