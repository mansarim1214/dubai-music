import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/View/Navbar";
import Footer from "./components/View/Footer";
import Home from "./components/View/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import ArtistDetail from "./components/View/ArtistDetail";
import Favorites from "./components/View/Favorites";
import Venues from "./components/View/Venues";
import VenueDetail from "./components/View/VenueDetail";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venuedetail" element={<VenueDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
