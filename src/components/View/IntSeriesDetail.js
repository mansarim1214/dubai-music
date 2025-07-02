import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { FaWhatsapp, FaSpotify, FaApple, FaSoundcloud, FaYoutube } from "react-icons/fa";
import "./frontend.css";

const BsArrowLeftSquareFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsArrowLeftSquareFill,
  }))
);

const IntSeriesDetail = ({ onNavigate }) => {
  const { id } = useParams();
  const [intseries, setIntseries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleBack = () => {
    setProgress(50);
    if (onNavigate) {
      onNavigate(`/introducing-series`);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchIntSeries = async () => {
      setProgress(30);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/intseries/${id}`
        );
        setIntseries(response.data);
        setLoading(false);

        const imagePromises = response.data.gallery.map(async (img) => {
          const src = `${process.env.REACT_APP_API_URL}/${img}`;
          return new Promise((resolve) => {
            const image = new Image();
            image.src = src;
            image.onload = () =>
              resolve({ src, width: image.width, height: image.height });
          });
        });

        const loadedImages = await Promise.all(imagePromises);
        setGalleryImages(loadedImages);
      } catch (error) {
        console.error("Error fetching IntSeries:", error);
        setError("Failed to fetch IntSeries. Please try again later.");
      } finally {
        setProgress(100);
        setLoading(false);
      }
    };

    fetchIntSeries();
  }, [id]);

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=Check this out: ${window.location.href}`;

  const addTargetToLinks = (html) =>
    html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

  return (
    <div className="venue-detail bg-custom">
      <div className="container">
        <Suspense fallback={<div>Loading Back Button...</div>}>
          <span onClick={handleBack} className="back-btn">
            <BsArrowLeftSquareFill size={30} className="my-2" />
          </span>
        </Suspense>

        <h2>{loading ? "" : intseries?.epno}</h2>
        <h1 className="intseries-title">
          {loading
            ? ""
            : intseries?.title?.split(" ").map((word, i) => (
                <span key={i} className="title-line">
                  {word}
                </span>
              ))}
        </h1>

        {!loading && !error && intseries && (
          <>
            <div id="intseries-desc" className="mt-3">
              <div className="row">
                <div className="col-md-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        addTargetToLinks(intseries.description) ||
                        "<em>Description not available yet</em>",
                    }}
                  />

<div className="row my-4 text-left int-icons">
  {intseries.spotify && (
    <div className="col-auto">
      <a href={intseries.spotify} target="_blank" rel="noopener noreferrer">
        <FaSpotify size={25} color="#1DB954" />
      </a>
    </div>
  )}
  {intseries.appleMusic && (
    <div className="col-auto">
      <a href={intseries.appleMusic} target="_blank" rel="noopener noreferrer">
        <FaApple size={25} />
      </a>
    </div>
  )}
  {intseries.soundcloud && (
    <div className="col-auto">
      <a href={intseries.soundcloud} target="_blank" rel="noopener noreferrer">
        <FaSoundcloud size={25} color="#FF5500" />
      </a>
    </div>
  )}
  {intseries.youtube && (
    <div className="col-auto">
      <a href={intseries.youtube} target="_blank" rel="noopener noreferrer">
        <FaYoutube size={25} color="#FF0000" />
      </a>
    </div>
  )}
</div>



                </div>

                <div className="col-md-6"></div>

                {(galleryImages.length || intseries.featuredImage) && (
                  <div className="col-md-6 text-right">
                    {intseries.featuredImage && (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${intseries.featuredImage}`}
                        alt={intseries.title}
                        className="venue-image mb-2"
                        style={{ width: "100%", height: "auto" }}
                        loading="lazy"
                      />
                    )}

                    {galleryImages.length > 0 && (
                      <div className="gallery-container">
                        <h4>Gallery</h4>
                        <Gallery>
                          <div className="grid-container">
                            {galleryImages.map((img, index) => (
                              <Item
                                key={index}
                                original={img.src}
                                thumbnail={img.src}
                                width={img.width}
                                height={img.height}
                              >
                                {({ ref, open }) => (
                                  <img
                                    ref={ref}
                                    onClick={open}
                                    src={img.src}
                                    alt={`galleryimg ${index + 1}`}
                                    className="grid-item"
                                    style={{ cursor: "pointer" }}
                                    loading="lazy"
                                  />
                                )}
                              </Item>
                            ))}
                          </div>
                        </Gallery>
                      </div>
                    )}

                    <div className="whatsapp-share text-end my-5">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                <FaWhatsapp /> Share with Friends
              </a>
            </div>
                  </div>
                )}
              </div>
            </div>

            
          </>
        )}

        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default IntSeriesDetail;
