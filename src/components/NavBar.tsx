import { NavLink } from "react-router";
import "../components/styles/navBar.css";
import { useState, useId } from "react";
import { getPagePath } from "./functions/GetPagePath";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  const menuPanelId = useId();

  return (
    <>
      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-nav-links-overlay"
          aria-label="Close navigation menu"
          onClick={() => toggleMobileMenu(false)}
        />
      )}

      <nav aria-label="Main Site Navigation">
        <NavLink
          to={`${getPagePath("home")}`}
          aria-label="Home - Portfolio of Jordan Latta"
          className={({ isActive }) =>
            "nav-btn home " + (isActive ? "active" : "")
          }
          onClick={() => {
            toggleMobileMenu(false);
            window.scrollTo({ top: 0 });
          }}
        >
          <span className="material-icons" aria-hidden="true">
            home
          </span>
          Jordan Latta
        </NavLink>

        <button
          type="button"
          className="material-icons nav-btn mb-hamburger"
          aria-expanded={mobileMenuOpen}
          aria-controls={menuPanelId}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => toggleMobileMenu(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "close" : "menu"}
        </button>

        <ul
          className={`nav-links-list ${mobileMenuOpen ? "is-shown" : "is-hidden"}`}
        >
          <li>
            <NavLink
              to={`${getPagePath("about")}`}
              className={({ isActive }) =>
                "nav-btn " + (isActive ? "active" : "")
              }
              onClick={() => {
                toggleMobileMenu(false);
                window.scrollTo({ top: 0 });
              }}
            >
              About/Resume
            </NavLink>
          </li>

          <li>
            <a
              href="#contact"
              className="nav-btn"
              onClick={() => toggleMobileMenu(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
