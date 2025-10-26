import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUncoSeries from './EditUncoSeries';

const ManageUncoSeries = () => {
  const [uncoSeriesList, setUncoSeriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [editUncoSeries, setEditUncoSeries] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUncoSeries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/uncoseries`);
        setUncoSeriesList(response.data);
      } catch (error) {
        console.error('Error fetching UncoSeries:', error);
      }
    };

    fetchUncoSeries();
  }, []);

  useEffect(() => {
    const filtered = uncoSeriesList.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, uncoSeriesList]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/uncoseries/${id}`);
      setUncoSeriesList(uncoSeriesList.filter((item) => item._id !== id));
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting UncoSeries:', error);
    }
  };

  const handleEdit = (item) => {
    setEditUncoSeries(item);
  };

  return (
    <div className="manage-uncoseries">
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Action successful!
          <button
            type="button"
            className="close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {editUncoSeries ? (
        <EditUncoSeries
          uncoSeries={editUncoSeries}
          setEditUncoSeries={setEditUncoSeries}
          setShowAlert={setShowAlert}
        />
      ) : (
        <>
          <h3>Manage Uncovered Series</h3>
          <p>Total Entries: {uncoSeriesList.length}</p>

          <form onSubmit={(e) => e.preventDefault()} className="mb-3">
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Ep #</th>
                <th>Featured Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.epno}</td>
                  <td>
                    {item.featuredImage ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${item.featuredImage}`}
                        alt={item.title}
                        style={{ width: "100px", height: "auto", objectFit: "cover" }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ManageUncoSeries;
