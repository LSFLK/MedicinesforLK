import React, { useEffect } from "react";

import { Hooks, useAuthContext } from "@asgardeo/auth-react";

import "./navbar.css";

export default function NavBar() {
  const { state, signIn, signOut, on } = useAuthContext();

  /**
   * handles the error occurs when the logout consent page is enabled
   * and the user clicks 'NO' at the logout consent page
   */
  useEffect(() => {
    on(Hooks.SignOut, () => {
      // setHasLogoutFailureError(false);
    });
  }, [on]);

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

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
              />
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
          {state.isAuthenticated ? (
            <button
              type="button"
              onClick={() => handleLogout()}
              className="navbar__item logout-btn"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleLogin()}
              className="navbar__item logout-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
