import { Link } from "react-router-dom";
import "./styles.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-black">
        <div className="footer-black-top">
          <img src="/assets/images/about-us/sl-red-cross-logo.jpg" alt="" />
          <p>{/* TODO: add content here */}</p>
          <div className="icons">
            <p>FOLLOW</p>
            <FaFacebookF className="icon" />
            <FaTwitter className="icon" />
            <FaInstagram className="icon" />
          </div>
        </div>
        <div className="footer-black-bottom">
          <Link to="/about-us" className="text-link">
            About
          </Link>
          <span>|</span>
          <Link to="/donors" className="text-link">
            Donors
          </Link>
          <span>|</span>
          <Link to="" className="text-link">
            Request Medicine
          </Link>
          <span>|</span>
          <Link to="/suppliers" className="text-link">
            Medical Suppliers
          </Link>
          <span>|</span>
          <Link to="/news-room" className="text-link">
            Newsroom
          </Link>
          <span>|</span>
          <Link to="/login" className="text-link">
            Login
          </Link>
        </div>
      </div>
      <div className="footer-gray">
        <p>{/* TODO: add content here */}</p>
        <div>
          <a href="">Privacy</a>
          <span className="dot"></span>
          <a href="">Terms</a>
          <span className="dot"></span>
          <a href="">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
