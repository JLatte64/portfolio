import { Link } from "react-router";
import "../components/styles/NavBar.css";
//import { useEffect, useRef, useState } from "react";
//import useWindowWidth from "./useWindowWidth";
//import NavButton from "./NavButton";

export function NavBar() {
  //const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  //const width = useWindowWidth();

  //function handleMobileMenuClick() {
  //  toggleMobileMenu(!mobileMenuOpen);
  //}

  return (
    <>
      <nav className="nav">
        <Link to="/portfolio">
          <button className="navbar_button site-title">
            <span className="material-icons">home</span>
          </button>
        </Link>

        <Link to="/portfolio/work">
          <button className="navbar_button">Portfolio</button>
        </Link>
        <Link to="/portfolio/experience">
          <button className="navbar_button">Resume</button>
        </Link>
        <Link to="/portfolio/about">
          <button className="navbar_button">About</button>
        </Link>
        <Link to="/portfolio/about">
          <button className="navbar_button">Contact</button>
        </Link>
      </nav>
    </>
  );
}
