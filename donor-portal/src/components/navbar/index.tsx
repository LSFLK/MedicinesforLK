import { Link } from "react-router-dom";
import "./styles.css";
import {useContext} from "react";
import UserContext from "../../userContext";

export function NavBar() {
  const userId = useContext(UserContext);

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <div className="nav-links">
        <Link to="/about-us" className="nav-link">
          About
        </Link>
        <span>|</span>
        <Link to="/donors" className="nav-link">
          Donors
        </Link>
        <span>|</span>
        <Link to="/suppliers" className="nav-link">
          Hospital and Suppliers
        </Link>
        <span>|</span>
        <Link to="/news-room" className="nav-link">
          Newsroom
        </Link>
        {userId != null?
          <>
            <span>|</span>
            <Link to="/" className="nav-link">
              My Profile
            </Link>
          </>
          :
          <Link to="/login" className="login-btn">
            Login
          </Link>
        }
      </div>
    </nav>
  );
}
