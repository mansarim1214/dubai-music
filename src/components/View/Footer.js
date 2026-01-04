import React from "react";
import { Link } from 'react-router-dom'; 
import "./Navbar.css";
import { BsInstagram, BsFacebook, BsTiktok, BsWhatsapp,  } from "react-icons/bs";


const Footer = () => {
  return (
    <div className="footer pt-2 pb-2 text-center">
      <div className="container">
        <div className="social-icons">
                    <Link to="https://www.instagram.com/dubaimusic" target="_blank"> <BsInstagram /> </Link>
                    <Link to="https://www.facebook.com/dubaimusic.comm" target="_blank"><BsFacebook /></Link>
                    <Link to="https://www.tiktok.com/@dxbmusic?lang=en" target="_blank"><BsTiktok /></Link>
                    <Link to="http://wa.me/971585568742" target="_blank"><BsWhatsapp /></Link>
        </div>
        <p className="mt-2" style={{marginBottom: "0"}}>© 2026 Dubai Music . All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
 