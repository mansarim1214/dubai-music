// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (

    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-black px-3">
      <a className="navbar-brand" href="/">
        <img src="/dubai-music-white-logo.webp" width="150px" className="d-inline-block align-top" alt="Logo" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse t-right" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact="true" to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact="true" to="venues" className="nav-link">Venues</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
