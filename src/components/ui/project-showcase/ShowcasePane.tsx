import { useState } from "react";
import { ShowcaseSlider } from "./ShowcaseSlider";
import { ShowcaseControls } from "./ShowcaseControls";
import { ShowcaseLightbox } from "./ShowcaseLightbox";
import MediaCaption from "../MediaCaption";
import type { ProjectData } from "../../../types/portfolioTypes";

interface ShowcasePaneProps {
  projectData: ProjectData;
}

export const ShowcasePane = ({ projectData }: ShowcasePaneProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCaptionActive, setIsCaptionActive] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!projectData) return null;

  const totalSlides = projectData.carouselMedia?.length || 0;

  return (
    <section
      className="pane-left-carousel"
      data-lightbox-active={isLightboxOpen || undefined}
    >
      <ShowcaseSlider
        activeIndex={activeIndex}
        onSlideChange={setActiveIndex}
        mediaList={projectData.carouselMedia}
      />

      <ShowcaseLightbox
        activeIndex={activeIndex}
        mediaList={projectData.carouselMedia}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      {/* 🎯 UNIFIED CALLBACKS: Single streamlined property pipeline */}
      <ShowcaseControls
        activeIndex={activeIndex}
        totalSlides={totalSlides}
        onSlideChange={setActiveIndex}
      >
        <button
          type="button"
          onClick={() => setIsCaptionActive(!isCaptionActive)}
        >
          {isCaptionActive ? "CC // Off" : "CC // On"}
        </button>
        <button
          type="button"
          onClick={() => setIsLightboxOpen((prev) => !prev)}
        >
          {isLightboxOpen ? "✕" : "🔍"}
        </button>
      </ShowcaseControls>

      {isCaptionActive && (
        <MediaCaption
          activeIndex={activeIndex}
          mediaList={projectData.carouselMedia}
        />
      )}
    </section>
  );
};

export default ShowcasePane;
