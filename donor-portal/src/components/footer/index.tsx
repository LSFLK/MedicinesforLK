import { Link } from "react-router-dom";
import "./styles.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-red">
        <h1>Cant decide which aid package to support?</h1>
        <p>
          You don't have to! The Red Cross team in collaboration with various
          teams on the ground are continuosly reviewing the countries needs and
          prioritizing based on severity and criticality.
        </p>
        <p>Your donation will go be used to fund various aid packages</p>
        <br />
        <p>Donate to:</p>
        <div>
          <button>Sri Lankan Red Cross</button>
          <span>or</span>
          <button>Local Registered Charity</button>
        </div>
      </div>
      <div className="footer-black">
        <div className="footer-black-top">
          <img
            src="/assets/images/about-us/sl-red-cross-logo.jpg"
            alt=""
          />
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud.
          </p>
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
          <Link to="" className="text-link">
            Newsroom
          </Link>
          <span>|</span>
          <Link to="/login" className="text-link">
            Login
          </Link>
        </div>
      </div>
      <div className="footer-gray">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud.
        </p>
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
