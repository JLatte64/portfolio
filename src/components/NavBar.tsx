import { Link } from "react-router";
import "../components/styles/navBar.css";
import { useState } from "react";
import { getPagePath } from "./functions/GetPagePath";
import { projectSlugs } from "./ProjectSlugs";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);

  return (
    <>
      {mobileMenuOpen ? (
        <span
          className="mobile-background"
          onClick={() => {
            toggleMobileMenu(!mobileMenuOpen);
          }}
        />
      ) : null}

      <nav className="nav">
        <Link
          to={`${getPagePath("home")}#top`}
          aria-label="Home button"
          className="button nav-button home"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
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
            to={`${getPagePath("about")}`}
            className="button nav-button"
            onClick={() => {
              toggleMobileMenu(false);
              window.scrollTo({ top: 0 });
            }}
          >
            <h2>About/Resume</h2>
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
          {[...projectSlugs.entries()].map(([slug, project]) => (
            <Link
              key={slug}
              to={`/${slug}`}
              className={"button nav-button project-button"}
              onClick={() => toggleMobileMenu(false)}
            >
              <h2>{project.title}</h2>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
