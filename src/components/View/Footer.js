import React from "react";
import { Link } from 'react-router-dom'; 
import "./Navbar.css";
import { BsInstagram, BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer pt-3 pb-2 text-center">
      <div className="container">
        <div className="social-icons">
          <Link to=""> <BsInstagram /> </Link>
          <Link to=""><BsFacebook /></Link>
          <Link to=""><BsYoutube /></Link>
        </div>
        <p className="mt-3">© 2024 Dubai Music . All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
