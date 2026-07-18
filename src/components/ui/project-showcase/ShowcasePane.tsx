import { useRef, useState } from "react";
import { ShowcaseSlider } from "./ShowcaseSlider";
import { ShowcaseControls } from "./ShowcaseControls";
import { ShowcaseLightbox } from "./ShowcaseLightbox";
import MediaCaption from "../MediaCaption";
import type { ProjectData } from "../../../types/portfolioTypes";

interface ShowcasePaneProps {
  projectData: ProjectData;
}

export const ShowcasePane = ({ projectData }: ShowcasePaneProps) => {
  const sliderEmblaApiRef = useRef<any>(null);

  // 1. Maintain a single source of truth for the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projectData) return null;

  return (
    <ShowcasePaneLayout
      activeIndex={activeIndex}
      mediaList={projectData.carouselMedia}
      sliderEmblaApiRef={sliderEmblaApiRef}
    >
      {/* 
        🚀 SLIDER: Receives the state setter directly. It just calls 
        onIndexChange(newIndex) whenever a slide transition completes.
      */}
      <ShowcaseSlider
        sliderEmblaApiRef={sliderEmblaApiRef}
        onIndexChange={setActiveIndex}
        mediaList={projectData.carouselMedia}
      />
    </ShowcasePaneLayout>
  );
};

// 2. The Presentation Shell
interface LayoutProps {
  children: React.ReactNode;
  activeIndex: number;
  mediaList: any[];
  sliderEmblaApiRef: React.RefObject<any>;
}

const ShowcasePaneLayout = ({
  children,
  activeIndex,
  mediaList,
  sliderEmblaApiRef,
}: LayoutProps) => {
  const [isCaptionActive, setIsCaptionActive] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section
      className="pane-left-carousel"
      data-lightbox-active={isLightboxOpen || undefined}
    >
      {/* Keeps your slider isolated via composition */}
      {children}

      {/* 🎯 PASSED AS STANDARD PROPS: No more useEffect/useRef listeners needed inside these! */}
      <ShowcaseLightbox
        activeIndex={activeIndex}
        mediaList={mediaList}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />

      <ShowcaseControls
        sliderEmblaApiRef={sliderEmblaApiRef}
        activeIndex={activeIndex}
        totalSlides={mediaList.length}
      >
        <button
          type="button"
          onClick={() => setIsCaptionActive(!isCaptionActive)}
        >
          {isCaptionActive ? "CC // Off" : "CC // On"}
        </button>
        <button
          type="button"
          onClick={() => setIsLightboxOpen(!isLightboxOpen)}
        >
          {isLightboxOpen ? "✕" : "🔍"}
        </button>
      </ShowcaseControls>

      {isCaptionActive && (
        <MediaCaption activeIndex={activeIndex} mediaList={mediaList} />
      )}
    </section>
  );
};

export default ShowcasePane;
