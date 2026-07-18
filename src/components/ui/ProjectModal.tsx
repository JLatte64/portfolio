import { useEffect, useRef, useState } from "react";
import "./ProjectModal.css";
import { useNavigate } from "react-router";
import { RELATIVE_ROUTES } from "../../config/routes.config";
import { useProject } from "../../hooks/useProject";
import CopyLinkButton from "./CopyLinkbutton";
import { useLayoutState } from "../../hooks/useLayoutState";
import ShowcasePane from "./project-showcase/ShowcasePane";

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

  if (!projectData) return null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !projectData) return;

    if (!dialog.open) {
      dialog.showModal();
      setFadeState("fade-in");
      setLastScrollPos();
    }

    const fadeInTimer = setTimeout(() => {
      setMountPageLayout(false);
      setFadeState("open");
    }, modalFadeTimer);

    return () => clearTimeout(fadeInTimer);
  }, []);

  const handleClose = (e?: React.SyntheticEvent | Event) => {
    e?.preventDefault();

    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    restoreLastScrollPos();
    setMountPageLayout(true);
    setFadeState("fade-out");

    const fadeOutTimer = setTimeout(() => {
      setFadeState("closed");

      navigate(RELATIVE_ROUTES.home);
    }, modalFadeTimer);

    return () => clearTimeout(fadeOutTimer);
  };

  if (!projectData) return null;

  return (
    <dialog
      ref={dialogRef}
      style={{ "--modal-fade-timer": `${modalFadeTimer}ms` }}
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
            ✕
          </button>
        </header>

        {/* 💡 Note: "is-lightbox-active" will now be added here imperatively by the child layout */}
        <div className="modal-panes-body">
          <ShowcasePane projectData={projectData} />
          <aside className="pane-right-details">
            <p className="modal-main-description-text">
              {projectData.description}
            </p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
