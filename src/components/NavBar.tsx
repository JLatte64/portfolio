import {Link} from "react-router";
import "../components/styles/NavBar.css";
import {useState} from "react";
//import { useEffect, useRef, useState } from "react";
//import useWindowWidth from "./useWindowWidth";
//import NavButton from "./NavButton";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  //const width = useWindowWidth();

  function handleMobileMenuClick() {
    toggleMobileMenu(!mobileMenuOpen);
  }

  return (
    <>
      <nav className="nav">
        <Link
          to="/portfolio"
          className="nav-button site-title"
          aria-label="Home button"
        >
          Jordan Latta
        </Link>

        <ul
          className={
            "nav-links-container" + (mobileMenuOpen ? " active" : " inactive")
          }
        >
          <li className="nav-button">
            <Link to="/portfolio/work" className="nav-link">
              Portfolio
            </Link>
          </li>
          <li className="nav-button">
            <Link to="/portfolio/experience" className="nav-link">
              Resume
            </Link>
          </li>
          <li className="nav-button">
            <Link to="/portfolio/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-button">
            <Link to="/portfolio/about" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        <button
          className="material-icons nav-button hamburger-icon"
          aria-label="Toggle navigation menu"
          onClick={handleMobileMenuClick}
        >
          {"menu" + (mobileMenuOpen ? "_close" : "_open")}
        </button>
      </nav>
    </>
  );
}
