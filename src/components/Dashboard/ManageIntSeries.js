import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIntSeries from './EditIntSeries';

const ManageIntSeries = () => {
  const [intSeriesList, setIntSeriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [editIntSeries, setEditIntSeries] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchIntSeries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/intseries`);
        setIntSeriesList(response.data);
      } catch (error) {
        console.error('Error fetching IntSeries:', error);
      }
    };

    fetchIntSeries();
  }, []);

  useEffect(() => {
    const filtered = intSeriesList.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, intSeriesList]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/intseries/${id}`);
      setIntSeriesList(intSeriesList.filter((item) => item._id !== id));
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting IntSeries:', error);
    }
  };

  const handleEdit = (item) => {
    setEditIntSeries(item);
  };

  return (
    <div className="manage-intseries">
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

      {editIntSeries ? (
        <EditIntSeries
          intSeries={editIntSeries}
          setEditIntSeries={setEditIntSeries}
          setShowAlert={setShowAlert}
        />
      ) : (
        <>
          <h3>Manage Introducing Series</h3>
          <p>Total Entries: {intSeriesList.length}</p>

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

export default ManageIntSeries;
