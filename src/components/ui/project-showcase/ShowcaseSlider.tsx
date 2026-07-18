import { useEffect, useRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { MemoMediaWrapper } from "../RenderMedia";
import "./ShowcaseSlider.css";

interface ShowcaseSliderProps {
  mediaList: any[];
  onIndexChange: (index: number) => void;
  sliderEmblaApiRef: React.RefObject<any>;
}

export const ShowcaseSlider = ({
  mediaList,
  onIndexChange,
  sliderEmblaApiRef,
}: ShowcaseSliderProps) => {
  const rawTotal = mediaList?.length || 0;

  // Cache the data computation safely away from runtime paint trees
  const clonedList = useMemo(() => {
    return rawTotal === 2 ? [...mediaList, ...mediaList] : mediaList;
  }, [mediaList, rawTotal]);

  const renderTotal = clonedList?.length || 0;

  const [emblaViewportRef, emblaApi] = useEmblaCarousel({
    loop: renderTotal > 1,
    align: "center",
    containScroll: false,
  });

  // Stores the persistent physical DOM wrapper nodes holding the real Vidstack instances
  const playerNodesRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // 💡 EFFECT 1: Exposes the Embla API controller instance back up to the reference pointer
  useEffect(() => {
    if (!emblaApi || !sliderEmblaApiRef) return;
    sliderEmblaApiRef.current = emblaApi;
    return () => {
      sliderEmblaApiRef.current = null;
    };
  }, [emblaApi, sliderEmblaApiRef]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only intercept events if the user is actively focusing somewhere inside the slider frame
      const emblaNode = emblaApi.rootNode();
      if (!emblaNode?.contains(document.activeElement)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [emblaApi]);

  // 💡 EFFECT 2: Synchronizes Slide Indices and Moves Raw Video DOM Elements
  useEffect(() => {
    if (!emblaApi) return;

    const handleTransition = () => {
      const current = emblaApi.selectedScrollSnap() ?? 0;
      const normalizedIndex = rawTotal ? current % rawTotal : current;

      // A. Centralized State Trigger: Broadcast index up to listening layout shell
      onIndexChange(normalizedIndex);

      // B. DOM Re-parenting: Move the physical player into the active Embla frame slot
      if (rawTotal === 2) {
        const currentSlideFrame = emblaApi.slideNodes()[current];
        const actualPlayerDOMNode = playerNodesRef.current[normalizedIndex];

        if (currentSlideFrame && actualPlayerDOMNode) {
          currentSlideFrame.appendChild(actualPlayerDOMNode);
        }
      }
    };

    handleTransition();

    emblaApi.on("select", handleTransition);
    emblaApi.on("reInit", handleTransition);

    return () => {
      emblaApi.off("select", handleTransition);
      emblaApi.off("reInit", handleTransition);
    };
  }, [emblaApi, rawTotal, mediaList, onIndexChange]);

  if (!renderTotal) return null;

  return (
    <div className="embla" ref={emblaViewportRef}>
      {/* 
        🔥 FIXED: Direct child validation. 
        ONLY .embla__slide blocks are allowed inside the container wrapper. 
      */}
      <div className="embla__container">
        {clonedList.map((media, idx) => (
          <div key={idx} className="embla__slide">
            {/* Standard inline layout engine for collections where count != 2 */}
            {rawTotal !== 2 && <MemoMediaWrapper item={media} />}
          </div>
        ))}
      </div>{" "}
      {/* 👈 CRITICAL: Flex layout loop is closed and isolated here */}
      {/* 
        📦 THE HIDDEN MEDIA RECONCILIATION POOL:
        Strictly maps for the 2-item loop edge case. Sits entirely OUTSIDE the flexbox line 
        so it never forces layouts to stack or distort under standard counts.
      */}
      {rawTotal === 2 && (
        <div style={{ display: "none" }} aria-hidden="true">
          {mediaList.map((media, index) => (
            <div
              key={index}
              ref={(el) => {
                playerNodesRef.current[index] = el;
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
