import { useEffect, useRef, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MemoMediaWrapper } from "../RenderMedia";
import "./ShowcaseSlider.css";
import type { MediaData } from "../../../types/mediaTypes";

interface ShowcaseSliderProps {
  mediaList: MediaData[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
}

export const ShowcaseSlider = ({
  mediaList = [],
  activeIndex,
  onSlideChange,
}: ShowcaseSliderProps) => {
  const [engaged, setEngaged] = useState(false);
  const rawTotal = mediaList.length;

  const clonedList = useMemo(
    () => (rawTotal === 2 ? [...mediaList, ...mediaList] : mediaList),
    [mediaList, rawTotal],
  );
  const [emblaRef, embla] = useEmblaCarousel({
    loop: clonedList.length > 1,
    align: "center",
    watchFocus: false,
  });
  const playerNodesRef = useRef<any>({});

  useEffect(() => {
    if (!embla) return;

    const sync = () => {
      setEngaged(true);
      const snap = embla.selectedScrollSnap() ?? 0;
      const normalized = rawTotal ? snap % rawTotal : snap;

      if (normalized !== activeIndex) onSlideChange(normalized);

      if (
        rawTotal === 2 &&
        playerNodesRef.current[normalized] &&
        embla.slideNodes()[snap]
      ) {
        embla
          .slideNodes()
          [snap].appendChild(playerNodesRef.current[normalized]);
      }
    };

    const keys = (e: KeyboardEvent) => {
      if (
        ["input", "textarea"].includes(
          document.activeElement?.tagName.toLowerCase() || "",
        ) ||
        document.querySelector(".lightbox-overlay-fullscreen.is-open")
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setEngaged(true);
        onSlideChange(activeIndex === 0 ? rawTotal - 1 : activeIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setEngaged(true);
        onSlideChange(activeIndex === rawTotal - 1 ? 0 : activeIndex + 1);
      }
    };

    embla.on("pointerDown", () => setEngaged(true));
    embla.on("select", sync);
    window.addEventListener("keydown", keys);

    return () => {
      embla.off("pointerDown", () => setEngaged(true));
      embla.off("select", sync);
      window.removeEventListener("keydown", keys);
    };
  }, [embla, activeIndex, rawTotal, onSlideChange]);

  useEffect(() => {
    if (!embla) return;
    const current = embla.selectedScrollSnap() ?? 0;
    if (activeIndex !== (rawTotal ? current % rawTotal : current)) {
      setEngaged(true);
      embla.scrollTo(
        rawTotal === 2 ? (current >= 2 ? 2 : 0) + activeIndex : activeIndex,
      );
    }
  }, [embla, activeIndex, rawTotal]);

  if (!clonedList.length) return null;

  return (
    <div
      className="embla"
      ref={emblaRef}
      onScroll={(e) => (e.currentTarget.scrollLeft = 0)}
    >
      <div className="embla__container">
        {clonedList.map((media, idx) => (
          <div key={idx} className="embla__slide">
            {rawTotal !== 2 && (engaged || idx === activeIndex) && (
              <MemoMediaWrapper item={media} />
            )}
          </div>
        ))}
      </div>

      {rawTotal === 2 && engaged && (
        <div style={{ display: "none" }} aria-hidden="true">
          {mediaList.map((media, i) => (
            <div
              key={i}
              /* 🔥 FIXED: Wrap assignment in curly braces to prevent implicit return value */
              ref={(el) => {
                playerNodesRef.current[i] = el;
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <MemoMediaWrapper item={media} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowcaseSlider;
