import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";

import "./styles.css";

export function NavBar() {
  const { state, signIn, signOut } = useAuthContext();
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
            ? (<Link to="/login" onClick={() => signOut()} className="login-btn" >Logout</Link>)
            : (<Link to="/login" onClick={() => signIn()} className="login-btn" >Login</Link>)
        }
      </div>
    </nav>
  );
}
