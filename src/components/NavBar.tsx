import {Link} from "react-router";
import "../components/styles/NavBar.css";
import {useState} from "react";
import {HashLink} from "react-router-hash-link";
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
          <h3 className="site-title">Jordan Latta</h3>
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
            Portfolio
          </Link>
          <Link
            to="/portfolio/experience"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            Experience
          </Link>
          <Link
            to="/portfolio/about"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            My Story
          </Link>
          <HashLink
            smooth
            to="#contact"
            className="nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            Get in Touch
          </HashLink>
        </div>
      </nav>
    </>
  );
}
