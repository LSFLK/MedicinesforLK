import { Link } from "react-router-dom";
import "./styles.css";

export function NavBar() {
  return (
    <nav className="navbar">
     <div className="logo"></div>
     <div className="nav-links">
       <Link to="/about-us" className="nav-link"> About </Link><span>|</span>
       <Link to="/donors" className="nav-link"> Donors </Link><span>|</span>
       <Link to="" className="nav-link"> Request Medicine </Link><span>|</span>
       <Link to="" className="nav-link"> Medical Suppliers </Link><span>|</span>
       <Link to="" className="nav-link"> Newsroom </Link>
       <Link to="/login" className="login-btn"> Login </Link>
     </div>
    </nav>
  );
}
