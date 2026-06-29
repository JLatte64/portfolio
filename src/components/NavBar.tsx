import { Link } from "react-router";
import "../components/styles/navBar.css";
import { useEffect, useState, useId } from "react";
import { getPagePath } from "./functions/GetPagePath";
import { useSlugs } from "../context/SlugContext";

export function NavBar() {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  const { processedProjects, titleToSlug } = useSlugs();
  const menuPanelId = useId();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) toggleMobileMenu(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-background-overlay"
          aria-label="Close navigation menu"
          onClick={() => toggleMobileMenu(false)}
        />
      )}

      <nav className="nav-container" aria-label="Main Site Navigation">
        <div className="nav-content-inner">
          <Link
            to={`${getPagePath("home")}#top`}
            aria-label="Home - Portfolio of Jordan Latta"
            className="nav-brand-link"
            onClick={() => {
              toggleMobileMenu(false);
              window.scrollTo({ top: 0 });
            }}
          >
            <span className="material-icons" aria-hidden="true">
              home
            </span>
            <span className="site-title-text">Portfolio - Jordan Latta</span>
          </Link>

          <button
            type="button"
            className="material-icons nav-hamburger-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls={menuPanelId}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => toggleMobileMenu(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>

          <div
            id={menuPanelId}
            className={`nav-menu-panel ${mobileMenuOpen ? "is-open" : "is-hidden"}`}
          >
            <ul className="nav-links-list">
              <li>
                <Link
                  to={`${getPagePath("about")}`}
                  className="nav-link-item"
                  onClick={() => {
                    toggleMobileMenu(false);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  About/Resume
                </Link>
              </li>

              <li>
                <a
                  href="#contact"
                  className="nav-link-item"
                  onClick={() => toggleMobileMenu(false)}
                >
                  Contact
                </a>
              </li>

              {processedProjects.map((project) => {
                const projectSlug = titleToSlug[project.title] || "project";
                return (
                  <li key={project.id}>
                    <Link
                      to={`${getPagePath("dashboard")}/${projectSlug}`}
                      className="nav-link-item project-nav-link"
                      onClick={() => toggleMobileMenu(false)}
                    >
                      {project.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
