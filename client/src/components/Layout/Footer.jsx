import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="grid text-center">
          <div className="grid-item">
            <Link to="/">About </Link>
            <Link to="/about">About Us</Link>
            <Link to="/contactUs">Contact us</Link>
          </div>
          <div className="grid-item">
            <h6>Help</h6>
          </div>
          <div className="grid-item">
            <h6>Consumer Policy</h6>
            <Link to="/Policy">Privacy</Link>
            <Link to="/Policy">T&C</Link>
          </div>
        </div>
      </div>
      <div className="footnote">
        Developed By{" "}
        <Link to="https://www.linkedin.com/in/pravishti/ " className="nav-link">
          Pravishti Bhardwaj
        </Link>
      </div>
    </div>
  );
};

export default Footer;
