import React from "react";

import "./navbar.css";

interface NavBarProps {}

export function NavBar(params: NavBarProps) {
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
                alt="Elixir Logo"
                className="themedImage--light"
              />
            </div>
            <b className="navbar__title">Elixir</b>
          </a>
        </div>
        <div className="navbar__items navbar__items--right">
          <a className="navbar__item navbar__link">Login</a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__item navbar__link"
          >
            <span>
              Help
              <svg
                width="13.5"
                height="13.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="iconExternalLink_gzkf"
              >
                <path
                  fill="currentColor"
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
