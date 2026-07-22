import {useState, useRef, useEffect} from "react";
import {NavLink} from "react-router";
import {portfolioData, projectIndexToSlugLUT} from "../../data/portfolioData";
import {ABSOLUTE_ROUTES} from "../../config/routes.config";
import type {ProjectData} from "../../types/portfolioTypes";
import "./Navbar.css";

export interface ProjectNavButton {
  label: string;
  link: string;
}

const projectButtons: ProjectNavButton[] =
  portfolioData?.projects?.map(
    (project: ProjectData, index: number): ProjectNavButton => ({
      label: project.title,
      link: ABSOLUTE_ROUTES.toProject(projectIndexToSlugLUT[index]),
    }),
  ) || [];

const NavLinksList = ({
  isSubOpen,
  setIsSubOpen,
  closeAll,
}: {
  isSubOpen: boolean;
  setIsSubOpen: (val: boolean) => void;
  closeAll: () => void;
}) => (
  <ul className="nav-links-list">
    <li className="nav-item">
      <button
        className="proj-links-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsSubOpen(!isSubOpen);
        }}
        aria-haspopup="true"
        aria-expanded={isSubOpen}
        aria-controls="desktop-proj-menu"
      >
        Projects
      </button>
      <ul
        id="desktop-proj-menu"
        className={`proj-links-wrapper ${isSubOpen ? "is-open" : "is-closed"}`}
      >
        {projectButtons.map((node: any, index: number) => (
          <li key={`${node.link}-${index}`}>
            <NavLink to={node.link} onClick={closeAll}>
              {node.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
    <li>
      <NavLink to={ABSOLUTE_ROUTES.about} onClick={closeAll}>
        About / Resume
      </NavLink>
    </li>
    <li>
      <NavLink to={ABSOLUTE_ROUTES.contact} onClick={closeAll}>
        Contact
      </NavLink>
    </li>
  </ul>
);

export default function Navbar() {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null); // Anchor reference to fix focus tracking

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) dialogRef.current?.close();
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.open ? dialog.close() : dialog.showModal();
  };

  const closeAll = () => {
    setIsSubOpen(false);
    dialogRef.current?.close();
  };

  // FIX: Complete accessibility scroll-to-top routine
  const handleHomeClick = () => {
    closeAll();

    // Smooth scroll for mouse users
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Forced focus synchronization for keyboard/assistive software users
    brandRef.current?.focus({preventScroll: true});
  };

  return (
    <nav
      className="navbar"
      aria-label="Main"
      onBlur={(e) =>
        !e.currentTarget.contains(e.relatedTarget) && setIsSubOpen(false)
      }
    >
      <NavLink
        ref={brandRef}
        to={`${ABSOLUTE_ROUTES.home}#top`}
        className="nav-brand"
        onClick={handleHomeClick}
        tabIndex={0}
      >
        {portfolioData.siteTitle}
      </NavLink>

      <button
        className="nav-hamburger"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={dialogRef.current?.open || false}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {!isMobile && (
        <div className="nav-menu-desktop">
          <NavLinksList
            isSubOpen={isSubOpen}
            setIsSubOpen={setIsSubOpen}
            closeAll={closeAll}
          />
        </div>
      )}

      {isMobile && (
        <dialog
          ref={dialogRef}
          className="nav-menu-mobile-dialog"
          onClose={() => setIsSubOpen(false)}
          aria-label="Navigation Menu"
        >
          <button
            className="close-btn"
            onClick={toggleMobileMenu}
            aria-label="Close navigation menu"
          >
            &times;
          </button>
          <NavLinksList
            isSubOpen={isSubOpen}
            setIsSubOpen={setIsSubOpen}
            closeAll={closeAll}
          />
        </dialog>
      )}
    </nav>
  );
}
