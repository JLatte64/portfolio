import { Link } from "react-router";
import "../components/styles/NavBar.css";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";
//import { useEffect, useRef, useState } from "react";
//import useWindowWidth from "./useWindowWidth";
//import NavButton from "./NavButton";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);

  return (
    <>
      {mobileMenuOpen ? <span className="mobile-background" /> : null}

      <nav className="nav">
        <Link
          to="/portfolio"
          aria-label="Home button"
          className="nav-button home"
        >
          <span className="material-icons">home</span>
          <h2 className="site-title">Jordan Latta</h2>
        </Link>

        <button
          className="material-icons nav-button menu"
          aria-hidden="true"
          onClick={() => {
            toggleMobileMenu(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? "close" : " menu"}
        </button>

        <div
          className={
            "nav-links-container" + (mobileMenuOpen ? " show" : " hide")
          }
        >
          <Link
            to="/portfolio/work"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            <h2>Portfolio</h2>
          </Link>

          <Link
            to="/portfolio/about"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            <h2>About/Resume</h2>
          </Link>
          <HashLink
            smooth
            to="#contact"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            <h2>Contact</h2>
          </HashLink>
        </div>
      </nav>
    </>
  );
}
