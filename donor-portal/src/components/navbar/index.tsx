import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { FaBars, FaChevronUp } from "react-icons/fa";
import logo from "./images/logo.png";
import "./styles.css";

const mobileNavItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about-us",
    name: "About Us",
  },
  {
    path: "/donate-now",
    name: "Donate Now",
  },
  {
    path: "/suppliers",
    name: "Hospitals & Suppliers",
  },
  {
    path: "/news-room",
    name: "Newsroom",
  },
];

export default function NavBar() {
  const { state, signIn, signOut } = useAuthContext();
  const navbarRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  const handleLogin = () => {
    signIn();
  };

  const toggleMobileNav = () => {
    setIsMobileNavVisible((pre: boolean) => {
      return !pre;
    });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isMobileNavVisible &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target as HTMLElement)
      ) {
        toggleMobileNav();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMobileNavVisible]);

  return (
    <div className="navbar" ref={navbarRef}>
      <nav className="navbar-container">
        <div className="mobile-nav-top">
          {!isMobileNavVisible && (
            <FaBars className="menu-icon" size={20} onClick={toggleMobileNav} />
          )}
          {isMobileNavVisible && (
            <FaChevronUp
              className="menu-icon"
              size={20}
              onClick={toggleMobileNav}
            />
          )}
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Elixir Logo" />
            </div>
          </Link>
        </div>
        <div
          className={`nav-links ${
            isMobileNavVisible ? "mobile-nav show" : "mobile-nav hide"
          }`}
        >
          {mobileNavItems.map((navItem) => (
            <NavLink
              to={navItem.path}
              exact
              className="nav-link"
              onClick={toggleMobileNav}
            >
              {navItem.name}
            </NavLink>
          ))}

          {state.isAuthenticated ? (
            <button
              className="logout-btn nav-link"
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
