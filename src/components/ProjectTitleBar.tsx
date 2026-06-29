import purifyString from "./functions/PurifyString";
import { ToastEmitter } from "./ToastEmitter"; // 🚀 Connect to your global component
import { useSlugs } from "../context/SlugContext";
import type { ProjectData } from "./types/ProjectTypes";
import "./styles/projectTitleBar.css";
import type { ComponentPropsWithoutRef } from "react";

interface ProjectTitleBarProps extends ComponentPropsWithoutRef<"div"> {
  projModalData: ProjectData | undefined;
}

export default function ProjectTitleBar({
  projModalData,
  ...props
}: ProjectTitleBarProps) {
  if (!projModalData) return null;

  const { titleToSlug } = useSlugs();

  const purifiedTitleStr = purifyString(projModalData.title);

  const handleCopyLink = async () => {
    try {
      const projectSlug = titleToSlug[projModalData.title] || "project";
      const projectUrl = `${window.location.origin}/portfolio/${projectSlug}`;

      await navigator.clipboard.writeText(projectUrl);

      ToastEmitter.show("Link copied to clipboard!");
    } catch (err) {
      ToastEmitter.show("Failed to copy link.");
    }
  };

  return (
    <div className="project-title-bar" {...props}>
      <h2 className="project-title-heading">
        <button
          type="button"
          className="title-copy-btn"
          onClick={handleCopyLink}
          aria-label={`Copy shareable link for the ${purifiedTitleStr} project`}
        >
          {purifiedTitleStr}
          <span className="material-icons link-icon-span" aria-hidden="true">
            link
          </span>
        </button>
      </h2>
    </div>
  );
}
