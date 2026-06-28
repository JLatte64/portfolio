import purifyString from "./functions/PurifyString";
import { ToastEmitter } from "./ToastEmitter"; // 🚀 Connect to your global component
import { useSlugs } from "../context/SlugContext";
import type { ProjectData } from "./types/ProjectTypes";
import "./styles/projectTitleBar.css";

interface ProjectTitleBarProps {
  projModalData: ProjectData | undefined;
}

export default function ProjectTitleBar({
  projModalData,
}: ProjectTitleBarProps) {
  // Safety gate: If no metadata exists yet, exit early to prevent thread crashes
  if (!projModalData) return null;

  const { titleToSlug } = useSlugs();

  // 🚀 FIXED: Reads directly from your structured props object instead of an unbound variable
  const purifiedTitleStr = purifyString(projModalData.title);

  const handleCopyLink = async () => {
    try {
      const projectSlug = titleToSlug[projModalData.title] || "project";
      const projectUrl = `${window.location.origin}/portfolio/${projectSlug}`;

      await navigator.clipboard.writeText(projectUrl);

      // 🚀 Streamlined direct static method trigger
      ToastEmitter.show("Link copied to clipboard!");
    } catch (err) {
      ToastEmitter.show("Failed to copy link.");
    }
  };

  return (
    <div className="project-title-bar">
      <h2 className="project-title-heading">
        <button
          type="button"
          className="title-copy-btn"
          onClick={handleCopyLink} // 🚀 Wired securely directly to unblocked function
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
