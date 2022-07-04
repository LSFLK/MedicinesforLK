import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Hooks, useAuthContext } from "@asgardeo/auth-react";

import "./styles.css";


export function NavBar() {
  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    on
  } = useAuthContext();

  const [derivedAuthenticationState, setDerivedAuthenticationState] =
    useState<any>(null);
  const [hasAuthenticationErrors, setHasAuthenticationErrors] =
    useState<boolean>(false);
  const [hasLogoutFailureError, setHasLogoutFailureError] =
    useState<boolean>();

  const search = useLocation().search;
  const stateParam = new URLSearchParams(search).get("state");
  const errorDescParam = new URLSearchParams(search).get("error_description");

  useEffect(() => {
    if (stateParam && errorDescParam) {
      if (errorDescParam === "End User denied the logout request") {
        setHasLogoutFailureError(true);
      }
    }
  }, [stateParam, errorDescParam]);

  /**
      * handles the error occurs when the logout consent page is enabled
      * and the user clicks 'NO' at the logout consent page
      */
  useEffect(() => {
    on(Hooks.SignOut, () => {
      setHasLogoutFailureError(false);
    });
  }, [on]);

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    (async (): Promise<void> => {
      const basicUserInfo = await getBasicUserInfo();
      const idToken = await getIDToken();
      const decodedIDToken = await getDecodedIDToken();

      const derivedState = {
        authenticateResponse: basicUserInfo,
        idToken: idToken?.split("."),
        decodedIdTokenHeader: JSON.parse(atob(idToken?.split(".")[0])),
        decodedIDTokenPayload: decodedIDToken
      };

      setDerivedAuthenticationState(derivedState);
    })();
  }, [state?.isAuthenticated]);

  const handleLogin = () => {
    setHasLogoutFailureError(false);
    signIn().catch(() => setHasAuthenticationErrors(true));
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div className="nav-links">
        <Link to="/about-us" className="nav-link"> About </Link><span>|</span>
        <Link to="/donors" className="nav-link"> Donors </Link><span>|</span>
        <Link to="" className="nav-link"> Request Medicine </Link><span>|</span>
        <Link to="" className="nav-link"> Medical Suppliers </Link><span>|</span>
        <Link to="" className="nav-link"> Newsroom </Link>
        {/* <Link to="/login" className="login-btn"> Login </Link> */}
        {
          state.isAuthenticated
            ? (<Link to="/login" onClick={() => handleLogout()} className="login-btn" >Logout</Link>)
            : (<Link to="/login" onClick={() => handleLogin()} className="login-btn" >Login</Link>)
        }
      </div>
    </nav>
  );
}
