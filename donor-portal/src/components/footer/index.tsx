import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-black">
        <div className="footer-black-top">
          <div className="icons">
            <a href="https://www.facebook.com/pages/Sri-Lanka-Red-Cross-Society/133902706641597">
              <FaFacebookF className="icon" />
            </a>
            <a href="https://twitter.com/SLRedCross">
              <FaTwitter className="icon" />
            </a>
            <a href="https://instagram.com/slredcross?igshid=YmMyMTA2M2Y=">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.youtube.com/user/srilankanredcross">
              <FaYoutube className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-black-bottom">
          <Link to="/about-us" className="text-link">
            About
          </Link>
          <Link to="/donors" className="text-link">
            How to Donate
          </Link>
          <Link to="/medical-needs" className="text-link">
            Medical Needs
          </Link>
          <Link to="/suppliers" className="text-link">
            Medical Suppliers
          </Link>
          <Link to="/news-room" className="text-link">
            Newsroom
          </Link>
        </div>
      </div>
      <div className="footer-gray">
        <p>
          Al content copyright © 2022 Sri Lanka Red Cross. All rights reserved.{" "}
          |
          <a href=" https://www.redcross.lk/who-we-are/our-legal-status-in-sri-lanka/">
            {" "}
            Our Legal Status in Sri Lanka{" "}
          </a>
        </p>
      </div>
    </footer>
  );
}
