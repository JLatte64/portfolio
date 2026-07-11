import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { MediaData } from "../types/mediaTypes";
import { MemoMediaWrapper } from "./RenderMedia";
import LightboxViewer from "./LightboxViewer";
import CarouselControls from "./CarouselControls";
import "./ProjectCarousel.css";

export default function ProjectCarousel({
  mediaList,
  activeMediaRef,
  isLightboxOpen,
  setIsLightboxOpen,
}: any) {
  const rawTotal = mediaList?.length || 0;
  const clonedList = rawTotal === 2 ? [...mediaList, ...mediaList] : mediaList;
  const renderTotal = clonedList?.length || 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: renderTotal > 1,
    align: "center",
    containScroll: false,
  });
  const slideRefs = useRef<any[]>([]),
    activeElRef = useRef<HTMLDivElement>(null);
  const [, setTick] = useState(0);

  // 💡 THE CALLBACK POINTER: Caches the controls callback across layout repaints
  const slideChangeCallbackRef = useRef<((idx: number) => void) | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setTick((t) => t + 1);

      // 💡 THE REACTION BROADCASTER:
      // Executes the registered handler callback the exact millisecond
      // a user swiping gestures or clicks a navigation arrow completes!
      if (slideChangeCallbackRef.current) {
        slideChangeCallbackRef.current(
          (emblaApi.selectedScrollSnap() ?? 0) % rawTotal,
        );
      }
    };
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, rawTotal]);

  useEffect(() => {
    const el = activeElRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) return;
        const currentSnap = emblaApi?.selectedScrollSnap() ?? 0;
        const node = slideRefs.current[currentSnap]?.mediaElement;
        const v =
          node?.querySelector("video") ||
          (node instanceof HTMLVideoElement ? node : null);
        if (v?.src) {
          v.pause();
          const s = v.src;
          v.src = "";
          v.load();
          v.src = s;
        }
        const f =
          node?.querySelector("iframe") ||
          (node instanceof HTMLIFrameElement ? node : null);
        if (f?.src) {
          const s = f.src;
          f.src = "about:blank";
          setTimeout(() => {
            if (f) f.src = s;
          }, 0);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [emblaApi]);

  useImperativeHandle(activeMediaRef, () => {
    return {
      scrollPrev: () => emblaApi?.scrollPrev(),
      scrollNext: () => emblaApi?.scrollNext(),
      scrollTo: (i: number) => emblaApi?.scrollTo(i),
      get selectedIndex() {
        return (emblaApi?.selectedScrollSnap() ?? 0) % rawTotal;
      },
      get activeMedia() {
        return slideRefs.current[emblaApi?.selectedScrollSnap() ?? 0] || null;
      },
      // 💡 THE CONTRACT REGISTRATION METHOD
      onSlideChange: (callback: (idx: number) => void) => {
        slideChangeCallbackRef.current = callback;
      },
    };
  }, [emblaApi, rawTotal]);

  if (!renderTotal) return null;
  const currentSnapIndex = emblaApi?.selectedScrollSnap() ?? 0;
  const activeIndex = currentSnapIndex % rawTotal;

  return (
    <div className="carousel-section-group">
      <div className="carousel-viewport-wrapper">
        <div className="modal-carousel-container embla" ref={emblaRef}>
          <div className="modal-carousel-track embla__container">
            {clonedList.map((item: MediaData, idx: number) => (
              <div
                key={`${item.src}-slide-${idx}`}
                ref={idx === currentSnapIndex ? activeElRef : null}
                className="modal-carousel-item embla__slide"
                style={{ flex: "0 0 100%" }}
              >
                <MemoMediaWrapper
                  item={item}
                  exposedRef={{
                    get current() {
                      return slideRefs.current[idx];
                    },
                    set current(v) {
                      slideRefs.current[idx] = v;
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <LightboxViewer
          mediaItem={mediaList[activeIndex]}
          emblaApiRef={activeMediaRef}
          isOpen={isLightboxOpen}
        />

        <button
          type="button"
          className="carousel-arrow-btn arrow-prev"
          onClick={() => emblaApi?.scrollPrev()}
        >
          ⟨
        </button>
        <button
          type="button"
          className="carousel-arrow-btn arrow-next"
          onClick={() => emblaApi?.scrollNext()}
        >
          ⟩
        </button>
      </div>

      <CarouselControls length={rawTotal} carouselRef={activeMediaRef}>
        <button
          type="button"
          className="control-btn"
          onClick={() => setIsLightboxOpen(!isLightboxOpen)}
        >
          {isLightboxOpen ? "✕ Close View" : "🔍 Lightbox"}
        </button>
      </CarouselControls>
    </div>
  );
}
