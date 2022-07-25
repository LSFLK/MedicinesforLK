import React, { useEffect } from "react";

import { Hooks, useAuthContext } from "@asgardeo/auth-react";

import "./navbar.css";

export default function NavBar() {
  const { state, signIn, signOut, on } = useAuthContext();

  // const search = useLocation().search;
  // const stateParam = new URLSearchParams(search).get("state");
  // const errorDescParam = new URLSearchParams(search).get("error_description");

  // useEffect(() => {
  //   if (stateParam && errorDescParam) {
  //     if (errorDescParam === "End User denied the logout request") {
  //       setHasLogoutFailureError(true);
  //     }
  //   }
  // }, [stateParam, errorDescParam]);

  /**
   * handles the error occurs when the logout consent page is enabled
   * and the user clicks 'NO' at the logout consent page
   */
  useEffect(() => {
    on(Hooks.SignOut, () => {
      // setHasLogoutFailureError(false);
    });
  }, [on]);

  useEffect(() => {
    // (async (): Promise<void> => {
    //   const basicUserInfo = await getBasicUserInfo();
    //   const idToken = await getIDToken();
    //   const decodedIDToken = await getDecodedIDToken();
    //   const derivedState = {
    //     authenticateResponse: basicUserInfo,
    //     idToken: idToken?.split("."),
    //     decodedIdTokenHeader: JSON.parse(atob(idToken?.split(".")[0])),
    //     decodedIDTokenPayload: decodedIDToken
    //   };
    //   setDerivedAuthenticationState(derivedState);
    // })();
  }, [state?.isAuthenticated]);

  const handleLogin = () => {
    // setHasLogoutFailureError(false);
    signIn(); // .catch(() => setHasAuthenticationErrors(true));
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
            <a
              href="/"
              onClick={() => handleLogout()}
              className="navbar__item navbar__link"
            >
              Logout
            </a>
          ) : (
            <a
              href="/"
              onClick={() => handleLogin()}
              className="navbar__item navbar__link"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
