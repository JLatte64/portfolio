import { NavLink } from "react-router";
import { portfolioData, projectIndexToSlugLUT } from "../../data/portfolioData";
import type { ProjectData } from "../../types/portfolioTypes";
import "./Navbar.css";
import { ABSOLUTE_ROUTES } from "../../config/routes.config";
import { useState } from "react";

export interface ProjectNavButton {
  label: string;
  link: string;
}

// ✅ PERFECT: Stays outside the component so it doesn't recalculate on re-renders
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
  // ✅ OPTIMIZED: Switch to a clean boolean state to prevent string-parsing overhead
  const [isProjListOpen, setIsProjListOpen] = useState(false);

  const toggleList = () => setIsProjListOpen((prev) => !prev);
  const closeList = () => setIsProjListOpen(false);

  return (
    <nav>
      {/* ✅ OPTIMIZED: Matches your layout context path checking cleanly */}
      <NavLink to={ABSOLUTE_ROUTES.home}>
        <span className="material-icons" aria-hidden="true">
          home
        </span>
        <span className="sr-only">Home</span>
      </NavLink>

      <h2>{title}</h2>

      {/* ✅ ACCESSIBILITY: Adds standard aria properties for menu states */}
      <button
        className="proj-links-btn"
        onClick={toggleList}
        aria-expanded={isProjListOpen}
        aria-controls="project-nav-menu"
      >
        Projects
      </button>

      <NavLink to={ABSOLUTE_ROUTES.about}>About / Resume</NavLink>
      <NavLink to={ABSOLUTE_ROUTES.contact}>Contact</NavLink>

      {/* ✅ OPTIMIZED: Dynamic string interpolation replaces nested conditional sets */}
      <div
        id="project-nav-menu"
        className={`proj-links-wrapper ${isProjListOpen ? "is-open" : "is-closed"}`}
      >
        {projectButtons.map((node) => (
          <NavLink
            // ✅ CRITICAL: Replaced fluid index counters with specific unique URLs
            key={node.link}
            to={node.link}
            onClick={closeList} // ✅ UX: Auto-collapses dropdown when a project view loads
          >
            {node.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
