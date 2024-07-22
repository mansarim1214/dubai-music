import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import { BsHeartFill } from "react-icons/bs";
import "./frontend.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [artistsByCategory, setArtistsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log('API URL:', process.env.REACT_APP_API_URL);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
        const fetchedCategories = categoriesResponse.data;

        const artistsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/artists`);
        const fetchedArtists = artistsResponse.data;

        const desiredOrder = ['Trending', 'Singers', 'Band', 'DJ', 'Musicians'];

        fetchedCategories.sort((a, b) => {
          const aIndex = desiredOrder.indexOf(a.name);
          const bIndex = desiredOrder.indexOf(b.name);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        const storedFavorites = JSON.parse(localStorage.getItem('favoriteArtists')) || {};
        const groupedArtists = {};
        fetchedCategories.forEach((category) => {
          groupedArtists[category.name] = fetchedArtists
            .filter((artist) => artist.category === category.name)
            .map((artist) => ({
              ...artist,
              isFavorite: storedFavorites[artist._id] || false,
            }));
        });

        setCategories(fetchedCategories);
        setArtistsByCategory(groupedArtists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (artistId) => {
    const updatedArtistsByCategory = { ...artistsByCategory };
    let isFavorite = false;

    // Update local state
    Object.keys(updatedArtistsByCategory).forEach((category) => {
      updatedArtistsByCategory[category] = updatedArtistsByCategory[category].map((artist) => {
        if (artist._id === artistId) {
          isFavorite = !artist.isFavorite;
          return { ...artist, isFavorite };
        }
        return artist;
      });
    });

    setArtistsByCategory(updatedArtistsByCategory);

    // Update localStorage
    const favoriteArtists = JSON.parse(localStorage.getItem('favoriteArtists')) || {};
    if (isFavorite) {
      favoriteArtists[artistId] = true;
    } else {
      delete favoriteArtists[artistId];
    }
    localStorage.setItem('favoriteArtists', JSON.stringify(favoriteArtists));
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mainFront bg-custom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 main-text mb-5">
            <h3>Welcome to Dubai Music</h3>
            <p className="mt-3">
              Dubai Music is a hub featuring the city’s best singers and musicians. Explore the artists below and use our directory to hire singers and musicians in Dubai for your events.
            </p>
          </div>

          {categories.filter(
            (category) =>
              artistsByCategory[category.name] &&
              artistsByCategory[category.name].length > 0
          ).map((category) => (
            <section key={category._id} className="artSection">
              <h2 className="artCat my-3">{category.name}</h2>
              <div className="artistCarousel">
                <MultiCarousel responsive={responsive}>
                  {artistsByCategory[category.name]?.map((artist) => (
                    <div key={artist._id}>
                      <span
                        className={`favorite ${artist.isFavorite ? 'favorited' : ''}`}
                        onClick={() => toggleFavorite(artist._id)}
                        style={{ color: artist.isFavorite ? 'red' : 'grey' }}
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
