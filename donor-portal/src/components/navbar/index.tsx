import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import logo from "./images/logo.png";
import "./styles.css";

export default function NavBar() {
  const { state, signIn, signOut } = useAuthContext();

  const handleLogout = () => {
    signOut();
  };

  const handleLogin = () => {
    signIn();
  };

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Elixir Logo" />
          </div>
        </Link>
        <div className="nav-links">
          <NavLink to="/" exact className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about-us" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/donate-now" className="nav-link">
            Donate Now
          </NavLink>
          <NavLink to="/suppliers" className="nav-link">
            Hospitals & Suppliers
          </NavLink>
          <NavLink to="/news-room" className="nav-link">
            Newsroom
          </NavLink>
          {state.isAuthenticated ? (
            <button
              className="login-btn nav-link"
              type="button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="login-btn nav-link"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
