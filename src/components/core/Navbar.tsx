import { NavLink } from "react-router";
import { portfolioData, projectIndexToSlugLUT } from "../../data/portfolioData";
import type { ProjectData } from "../../types/portfolioTypes";
import "./Navbar.css";
import { ABSOLUTE_ROUTES } from "../../config/routes.config";
import { useState, useRef, type FocusEvent, type KeyboardEvent } from "react";

export interface ProjectNavButton {
  label: string;
  link: string;
}

const projectButtons: ProjectNavButton[] = portfolioData?.projects
  ? portfolioData.projects.map(
      (project: ProjectData, index: number): ProjectNavButton => ({
        label: project.title,
        link: ABSOLUTE_ROUTES.toProject(projectIndexToSlugLUT[index]),
      }),
    )
  : [];

const title = portfolioData.siteTitle;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleList = () => setIsOpen((prev) => !prev);

  const closeList = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <NavLink to={`${ABSOLUTE_ROUTES.home}#top`}>{title}</NavLink>

      <button
        ref={buttonRef}
        className="proj-links-btn"
        onClick={toggleList}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="project-nav-menu"
      >
        Projects
      </button>

      <NavLink to={ABSOLUTE_ROUTES.about}>About / Resume</NavLink>
      <NavLink to={ABSOLUTE_ROUTES.contact}>Contact</NavLink>

      <div
        id="project-nav-menu"
        role="menu"
        aria-label="Projects Submenu"
        className={`proj-links-wrapper ${isOpen ? "is-open" : "is-closed"}`}
        hidden={!isOpen}
      >
        {projectButtons.map((node) => (
          <NavLink
            key={node.link}
            to={node.link}
            role="menuitem"
            onClick={closeList}
          >
            {node.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
