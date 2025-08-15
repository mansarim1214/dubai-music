import React, { useEffect, useState } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 20;

const ManageMedia = () => {
  const [media, setMedia] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/media`);
      setMedia(res.data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/media/${filename}`);
      fetchMedia(); // Refresh list
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Could not delete this file. It may be in use.");
    }
  };

  // Filter based on search query
  const filteredMedia = media.filter((item) =>
    item.file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMedia.length / ITEMS_PER_PAGE);
  const paginated = filteredMedia.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="manage-media">
      <h2>Uploaded Media <span className="media-count">{filteredMedia.length}</span>
</h2>


      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by filename..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        className="form-control my-3"
      />

      {/* 📸 Media Grid */}
      <div className="grid-container">
        {paginated.map((item, i) => (
          <div key={i} className="gallery-item">
            <img
              src={`${process.env.REACT_APP_API_URL}${item.url}`}
              alt={item.file}
              className="thumbnail"
            />
            <p className="filename">{item.file}</p>
            <p className={(item.usedBy?.length ?? 0) > 0 ? "text-success" : "text-danger"}>
              {(item.usedBy?.length ?? 0) > 0
                ? `✅ Used in: ${item.usedBy.join(", ")}`
                : "❌ Not used"}
            </p>
            <button className="btn btn-sm btn-danger mt-1" onClick={() => handleDelete(item.file)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMedia;
