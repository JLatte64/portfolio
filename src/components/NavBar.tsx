import { Link } from "react-router";
import "../components/styles/NavBar.css";
import { useState } from "react";
import { getPagePath } from "./GetPagePath";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);

  return (
    <>
      {mobileMenuOpen ? <span className="mobile-background" /> : null}

      <nav className="nav">
        <Link
          to={getPagePath("home")}
          aria-label="Home button"
          className="button nav-button home"
        >
          <span className="material-icons">home</span>
          <h2 className="site-title">Portfolio - Jordan Latta</h2>
        </Link>

        <button
          className="button material-icons nav-button menu"
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
            to={getPagePath("about")}
            className="button nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            <h2>Resume / About</h2>
          </Link>
          <a
            href="#contact"
            className="button nav-button"
            onClick={() => {
              toggleMobileMenu(false);
            }}
          >
            <h2>Contact</h2>
          </a>
        </div>
      </nav>
    </>
  );
}
