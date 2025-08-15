import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { AddArtistForm, AddCategoryForm } from "./addForms";
import ViewArtists from "./ViewArtists";
import AddVenue from "./AddVenue";
import ManageVenue from "./ManageVenue";
import { Link } from "react-router-dom";
import AddMusicStore from "./AddMusicStore";
import ManageMusicStore from "./ManageStore";
import ManageWeddingVip from "./ManageWeddingVip";
import AddWeddingVip from "./AddWeddingVip";
import AddIntSeries from "./AddIntSeries";
import ManageIntSeries from "./ManageIntSeries";
import ManageMedia from "./ManageMedia";

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  // Store the correct access code in an environment variable
  const correctAccessCode = process.env.REACT_APP_DASHBOARD_CODE || "@1214Dubaimusic";

  const handleComponentSelect = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessCode === correctAccessCode) {
      setIsAuthenticated(true);
      setError("");
      // Set a default component to show after successful authentication
      setSelectedComponent("addArtist");
    } else {
      setError("Invalid access code. Please try again.");
    }
  };

  // If not authenticated, show the access code form
  if (!isAuthenticated) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-white p-4 access-form" >
          <h2 className="text-center mb-4">Dashboard Access</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="accessCode" className="form-label">
                Enter Access Code
              </label>
              <input
                type="password"
                className="form-control"
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
              />
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn enquirybtn w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, show the dashboard
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-2">
          <nav className="d-none d-md-block bg-black sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <div className="accordion" id="accordionArtists">
                    <div className="accordion-item">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseArtists"
                        aria-expanded="true"
                        aria-controls="collapseArtists"
                      >
                        Artists
                      </button>

                      <div
                        id="collapseArtists"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionArtists"
                      >
                        <div className="accordion-body">
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("addArtist")}
                          >
                            Add Artist
                          </Link>
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("editArtist")}
                          >
                            Manage Artists
                          </Link>

                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("addCategory")}
                          >
                            Artist Categories
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <div className="accordion" id="accordionVenues">
                    <div className="accordion-item">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseVenues"
                        aria-expanded="true"
                        aria-controls="collapseVenues"
                      >
                        Venues
                      </button>

                      <div
                        id="collapseVenues"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionVenues"
                      >
                        <div className="accordion-body">
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("addVenue")}
                          >
                            Add Venue
                          </Link>
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("manageVenue")}
                          >
                            Manage Venues
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <div className="accordion" id="accordionWedding">
                    <div className="accordion-item">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWedding"
                        aria-expanded="true"
                        aria-controls="collapseWedding"
                      >
                        Wedding-VIP
                      </button>

                      <div
                        id="collapseWedding"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionWedding"
                      >
                        <div className="accordion-body">
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("addWeddingVip")}
                          >
                            Add Wedding-VIP
                          </Link>
                          <Link
                            className="nav-link"
                            onClick={() => handleComponentSelect("manageWeddingVip")}
                          >
                            Manage Wedding-VIP
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

             


<li className="nav-item">
  <div className="accordion" id="accordionStore">
    <div className="accordion-item">
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseStore"
        aria-expanded="true"
        aria-controls="collapseStore"
      >
        Music Store
      </button>

      <div
        id="collapseStore"
        className="accordion-collapse collapse"
        aria-labelledby="headingStore"
        data-bs-parent="#accordionStore"
      >
        <div className="accordion-body">
          <Link
            className="nav-link"
            onClick={() => handleComponentSelect("addStore")}
          >
            Add Store
          </Link>
          <Link
            className="nav-link"
            onClick={() => handleComponentSelect("manageMusicStore")}
          >
            Manage Stores
          </Link>
        </div>
      </div>
    </div>
  </div>
</li>

<li className="nav-item">
  <div className="accordion" id="accordionIntSer">
    <div className="accordion-item">
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseIntSer"
        aria-expanded="true"
        aria-controls="collapseIntSer"
      >
        Introducing Series
      </button>

      <div
        id="collapseIntSer"
        className="accordion-collapse collapse"
        aria-labelledby="headingIntSer"
        data-bs-parent="#accordionIntSer"
      >
        <div className="accordion-body">
          <Link
            className="nav-link"
            onClick={() => handleComponentSelect("addIntSer")}
          >
            Add Introducing Series
          </Link>
          <Link
            className="nav-link"
            onClick={() => handleComponentSelect("manageIntSer")}
          >
            Manage Introducing Series
          </Link>
        </div>
      </div>
    </div>
  </div>
</li>

<li className="nav-item">
  <Link
            className="nav-link"
            onClick={() => handleComponentSelect("manageMedia")}
          >
            Manage Media
          </Link>
</li>

              </ul>
            </div>
          </nav>
        </div>

        <div className="col-md-10">
          <main role="main" className="ml-sm-auto p-4">
            {selectedComponent === "addArtist" && <AddArtistForm />}
            {selectedComponent === "addCategory" && <AddCategoryForm />}
            {selectedComponent === "editArtist" && <ViewArtists />}
            {selectedComponent === "addVenue" && <AddVenue />}
            {selectedComponent === "addWeddingVip" && <AddWeddingVip />}
            {selectedComponent === "manageVenue" && <ManageVenue />}
            {selectedComponent === "addStore" && <AddMusicStore />}
            {selectedComponent === "manageMusicStore" && <ManageMusicStore />}
            {selectedComponent === "manageWeddingVip" && <ManageWeddingVip />}
            {selectedComponent === "addIntSer" && <AddIntSeries />}
            {selectedComponent === "manageIntSer" && <ManageIntSeries />}         
            {selectedComponent === "manageMedia" && <ManageMedia />}         


 </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
