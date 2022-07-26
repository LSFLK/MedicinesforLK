import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.css";
import UserContext from "../../userContext";

export default function NavBar() {
  const userId = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserId");
    window.location.href = "/";
  };

  const handleLogin = () => {
    localStorage.setItem("loggedInUserId", "2");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo" />
      </Link>
      <div className="nav-links">
        <NavLink to="/about-us" className="nav-link">
          About
        </NavLink>
        <NavLink exact to="/donors" className="nav-link">
          How to Donate
        </NavLink>
        <NavLink to="/suppliers" className="nav-link">
          Medical Suppliers
        </NavLink>
        <NavLink to="/news-room" className="nav-link">
          Newsroom
        </NavLink>
        {userId != null ? (
          <a href="/" className="nav-link" onClick={() => handleLogout()}>
            Logout
          </a>
        ) : (
          <button
            className="login-btn"
            type="button"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

// The following code was commented out to make way for the above dummy component,
// that simulates a simple login for the demo
//
// import { useEffect, useState } from "react";
//
// import { NavLink, useLocation } from "react-router-dom";
// import { Hooks, useAuthContext } from "@asgardeo/auth-react";
//
// import "./styles.css";
// import { useContext } from "react";
// import UserContext from "../../userContext";
//
// export function NavBar() {
//   const {
//     state,
//     signIn,
//     signOut,
//     getBasicUserInfo,
//     getIDToken,
//     getDecodedIDToken,
//     on,
//   } = useAuthContext();
//
//   const [derivedAuthenticationState, setDerivedAuthenticationState] =
//     useState<any>(null);
//   const [hasAuthenticationErrors, setHasAuthenticationErrors] =
//     useState<boolean>(false);
//   const [hasLogoutFailureError, setHasLogoutFailureError] = useState<boolean>();
//
//   // const search = useLocation().search;
//   // const stateParam = new URLSearchParams(search).get("state");
//   // const errorDescParam = new URLSearchParams(search).get("error_description");
//
//   // useEffect(() => {
//   //   if (stateParam && errorDescParam) {
//   //     if (errorDescParam === "End User denied the logout request") {
//   //       setHasLogoutFailureError(true);
//   //     }
//   //   }
//   // }, [stateParam, errorDescParam]);
//
//   /**
//    * handles the error occurs when the logout consent page is enabled
//    * and the user clicks 'NO' at the logout consent page
//    */
//   useEffect(() => {
//     on(Hooks.SignOut, () => {
//       setHasLogoutFailureError(false);
//     });
//   }, [on]);
//
//   useEffect(() => {
//     if (!state?.isAuthenticated) {
//       return;
//     }
//
//     (async (): Promise<void> => {
//       const basicUserInfo = await getBasicUserInfo();
//       const idToken = await getIDToken();
//       const decodedIDToken = await getDecodedIDToken();
//
//       const derivedState = {
//         authenticateResponse: basicUserInfo,
//         idToken: idToken?.split("."),
//         decodedIdTokenHeader: JSON.parse(atob(idToken?.split(".")[0])),
//         decodedIDTokenPayload: decodedIDToken,
//       };
//
//       setDerivedAuthenticationState(derivedState);
//     })();
//   }, [state?.isAuthenticated]);
//
//   const handleLogin = () => {
//     setHasLogoutFailureError(false);
//     signIn().catch(() => setHasAuthenticationErrors(true));
//   };
//
//   const handleLogout = () => {
//     signOut();
//   };
//
//   return (
//     <nav className="navbar">
//       <NavLink to="/">
//         <div className="logo"></div>
//       </NavLink>
//       <div className="nav-links">
//         <NavLink to="/" className="nav-link">
//           Home
//         </NavLink>
//         <span>|</span>
//         <NavLink to="/about-us" className="nav-link">
//           About
//         </NavLink>
//         <span>|</span>
//         <NavLink to="/donors" className="nav-link">
//           Donors
//         </NavLink>
//         <span>|</span>
//         <NavLink to="/suppliers" className="nav-link">
//           Hospital and Suppliers
//         </NavLink>
//         <span>|</span>
//         <NavLink to="/news-room" className="nav-link">
//           Newsroom
//         </NavLink>
//         {state.isAuthenticated ? (
//           <NavLink
//             to="/login"
//             onClick={() => handleLogout()}
//             className="login-btn"
//           >
//             Logout
//           </NavLink>
//         ) : (
//           <NavLink
//             to="/login"
//             onClick={() => handleLogin()}
//             className="login-btn"
//           >
//             Login
//           </NavLink>
//         )}
//       </div>
//     </nav>
//   );
// }
