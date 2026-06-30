import {Link} from "react-router";
import "../components/styles/navBar.css";
import {useState, useId} from "react";
import {getPagePath} from "./functions/GetPagePath";

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

      <nav className="nav-container" aria-label="Main Site Navigation">
        <div className="nav-content-inner">
          <Link
            to={`${getPagePath("home")}`}
            aria-label="Home - Portfolio of Jordan Latta"
            className="nav-button nav-home-link"
            onClick={() => {
              toggleMobileMenu(false);
              window.scrollTo({top: 0});
            }}
          >
            <span className="material-icons" aria-hidden="true">
              home
            </span>
            Jordan Latta
          </Link>

          <button
            type="button"
            className="material-icons nav-button nav-hamburger-toggle"
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
              <Link
                to={`${getPagePath("about")}`}
                className="nav-button nav-link-item"
                onClick={() => {
                  toggleMobileMenu(false);
                  window.scrollTo({top: 0});
                }}
              >
                About/Resume
              </Link>
            </li>

            <li>
              <a
                href="#contact"
                className="nav-button nav-link-item"
                onClick={() => toggleMobileMenu(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
