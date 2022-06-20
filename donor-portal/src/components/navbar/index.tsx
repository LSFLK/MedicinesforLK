import { Link } from "react-router-dom";
import "./styles.css";

export function NavBar() {
  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <div className="navbar__items">
          <button
            aria-label="Navigation bar toggle"
            className="navbar__toggle clean-btn"
            type="button"
            tabIndex={0}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              ></path>
            </svg>
          </button>
          <a className="navbar__brand" href="/">
            <div className="navbar__logo">
              <img
                src="/assets/images/elixirLogo4.png"
                alt="Logo of a red cross"
                className="themedImage--light"
              />
            </div>
            <b className="navbar__title">Elixir</b>
          </a>
        </div>
        <div className="navbar__items navbar__items--right">
          <Link to="/about-us" className="navbar__item navbar__link">
            About
          </Link>
          <Link to="/login" className="navbar__item navbar__link">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
