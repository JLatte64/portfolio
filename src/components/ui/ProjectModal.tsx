import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "./ProjectModal.css";
import { useNavigate } from "react-router";
import { ABSOLUTE_ROUTES } from "../../config/routes.config";
import { useProject } from "../../hooks/useProject";
import CopyLinkButton from "./CopyLinkbutton";
import { useLayoutState } from "../../hooks/useLayoutState";
import ShowcasePane from "./project-showcase/ShowcasePane";
import type { ProjectSectionData } from "../../types/portfolioTypes";
import parse from "html-react-parser";

interface ProjectSectionProps {
  title: string;
  sec: ProjectSectionData;
  index: number;
}

const ProjectSection = ({ title, sec, index }: ProjectSectionProps) => {
  return (
    // CLS FIX: Contain layouts explicitly to stop structural reflows
    <section
      className="cls-contained-section"
      key={`${title}-sec-node-${index}`}
    >
      <h3>{sec.heading}</h3>
      <h4>{sec.subheading}</h4>
      <p className="cls-text-block">{parse(sec.paragraph)}</p>
      {sec.list && (
        <ul className="cls-list-block">
          {sec.list.map((listEl: string, listIndex: number) => (
            <li key={`${title}-list-node-${listIndex}`}>{parse(listEl)}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default function ProjectModal() {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const modalFadeTimer = 100;
  const { setMountPageLayout, setLastScrollPos, restoreLastScrollPos } =
    useLayoutState();
  const { projectData } = useProject();

  const [fadeState, setFadeState] = useState<
    "fade-in" | "fade-out" | "open" | "closed"
  >("closed");

  // CLS FIX: Calculate window scrollbar padding width before rendering to lock layout
  const scrollbarGutterCompensation = useMemo(() => {
    if (typeof window === "undefined") return "0px";
    return `${window.innerWidth - document.documentElement.clientWidth}px`;
  }, [fadeState]);

  const handleClose = useCallback(
    (e?: React.SyntheticEvent | Event) => {
      e?.preventDefault();

      const dialog = dialogRef.current;
      if (!dialog || !dialog.open) return;

      restoreLastScrollPos();
      setMountPageLayout(true);
      setFadeState("fade-out");

      const fadeOutTimer = setTimeout(() => {
        setFadeState("closed");
        document.body.style.removeProperty("padding-right"); // CLS FIX: Safely release layout
        navigate(ABSOLUTE_ROUTES.home);
      }, modalFadeTimer);

      return () => clearTimeout(fadeOutTimer);
    },
    [navigate, restoreLastScrollPos, setMountPageLayout],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !projectData) return;
    setLastScrollPos();

    if (!dialog.open) {
      // CLS FIX: Pad the body matching scrollbar width before dialog opening layout shifts occur
      document.body.style.paddingRight = scrollbarGutterCompensation;
      dialog.showModal();
      setFadeState("fade-in");
    }

    const fadeInTimer = setTimeout(() => {
      setMountPageLayout(false);
      setFadeState("open");
    }, modalFadeTimer);

    return () => clearTimeout(fadeInTimer);
  }, [
    projectData,
    setLastScrollPos,
    setMountPageLayout,
    scrollbarGutterCompensation,
  ]);

  useEffect(() => {
    if (fadeState !== "open") return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    dialogRef.current?.focus();
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [fadeState, handleClose]);

  if (!projectData) return null;

  return (
    <dialog
      ref={dialogRef}
      style={
        {
          "--modal-fade-timer": `${modalFadeTimer}ms`,
          containIntrinsicSize: "0 100vh", // CLS FIX: Give engine rendering dimensional hint bounds
        } as React.CSSProperties
      }
      className={`project-modal-dialog ${fadeState}`}
      onCancel={handleClose}
      aria-label={`Project Profile Viewport: ${projectData.title}`}
    >
      <div className="modal-inner-layout">
        <header className="modal-header-bar">
          <div className="header-left-meta">
            <h2>{projectData.title}</h2>
            <CopyLinkButton
              className="copy-link-title-btn"
              aria-label="Copy project link to clipboard"
            />
            <span className="modal-year-tag">{projectData.year}</span>
          </div>
          <button
            type="button"
            className="global-close-button"
            onClick={handleClose}
            aria-label="Close project details window"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="modal-panes-body">
          {/* CLS WARNING: Ensure ShowcasePane internally contains explicit aspect-ratios for its media elements */}
          <ShowcasePane projectData={projectData} />
          <aside className="pane-right-details">
            <p className="modal-main-description-text cls-text-block">
              {projectData.description}
            </p>
            {projectData.sections?.map(
              (sec: ProjectSectionData, index: number) => (
                <ProjectSection
                  key={`${projectData.title}-sec-node-${index}`}
                  title={projectData.title}
                  sec={sec}
                  index={index}
                />
              ),
            )}
          </aside>
        </div>
      </div>
    </dialog>
  );
}
