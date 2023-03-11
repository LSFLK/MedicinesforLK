import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import SubscriptionForm from "../SubscriptionForm";

const date = new Date();
const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-red">
        <h1>
          Have questions on <br className="visible-sm" /> how to donate or
          pledge?
        </h1>
        <div className="actions">
          <button className="btn" type="button">
            <a href="mailto:elixir@redcross.lk">Email Us</a>
          </button>
        </div>
      </div>
      <SubscriptionForm />
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
              href="https://www.linkedin.com/company/sri-lanka-red-cross-societysl/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="icon" />
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
        <div className="footer-gray-middle">
          <Link to="/about-us" className="text-link">
            About
          </Link>
          <Link to="/donate-now" className="text-link">
            Donate
          </Link>
          <Link to="/suppliers" className="text-link">
            Suppliers
          </Link>
          <Link to="/news-room" className="text-link">
            Newsroom
          </Link>
        </div>
      </div>
      <div className="footer-gray-bottom">
        <p>
          All content copyright © {date.getFullYear()} Sri Lanka Red Cross.
          <br className="visible-sm" />
          All rights reserved. |
          <a href=" https://www.redcross.lk/who-we-are/our-legal-status-in-sri-lanka/">
            {" "}
            Our Legal Status in Sri Lanka
          </a>
        </p>
      </div>
    </footer>
  );
});

export default Footer;
