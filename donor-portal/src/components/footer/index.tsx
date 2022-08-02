import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gray">
        <div className="footer-gray-top">
          <div className="icons">
            <a
              href="https://www.facebook.com/pages/Sri-Lanka-Red-Cross-Society/133902706641597"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="icon" />
            </a>
            <a
              href="https://twitter.com/SLRedCross"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="icon" />
            </a>
            <a
              href="https://instagram.com/slredcross?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="icon" />
            </a>
            <a
              href="https://www.youtube.com/user/srilankanredcross"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-geay-middle">
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
            Hospitals & Suppliers
          </Link>
          <Link to="/news-room" className="text-link">
            Newsroom
          </Link>
        </div>
      </div>
      <div className="footer-gray-bottom">
        <p>
          All content copyright © 2022 Sri Lanka Red Cross. All rights reserved.{" "}
          |
          <a href=" https://www.redcross.lk/who-we-are/our-legal-status-in-sri-lanka/">
            {" "}
            Our Legal Status in Sri Lanka
          </a>
        </p>
      </div>
    </footer>
  );
}
