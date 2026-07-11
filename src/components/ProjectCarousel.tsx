// src/components/ProjectCarousel.tsx
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { MediaData } from "../types/mediaTypes";
import { MemoMediaWrapper } from "./RenderMedia";
import "./ProjectCarousel.css";

export default function ProjectCarousel({ mediaList, activeMediaRef }: any) {
  const rawTotal = mediaList?.length || 0;
  const clonedList = rawTotal === 2 ? [...mediaList, ...mediaList] : mediaList;
  const renderTotal = clonedList?.length || 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: renderTotal > 1,
    align: "center",
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const listenersRef = useRef<Array<(idx: number) => void>>([]);
  const slideRefs = useRef<any[]>([]);
  const activeElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      const currentSnap = emblaApi.selectedScrollSnap() ?? 0;
      const normalizedIndex = currentSnap % rawTotal;
      setSelectedIndex(currentSnap);
      listenersRef.current.forEach((callback) => callback(normalizedIndex));
    };

    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, rawTotal]);

  useEffect(() => {
    const el = activeElRef.current;
    if (!el || !emblaApi) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;

        const currentSnap = emblaApi.selectedScrollSnap() ?? 0;
        const node = slideRefs.current[currentSnap]?.mediaElement;

        const v =
          node?.querySelector("video") ||
          (node instanceof HTMLVideoElement ? node : null);
        if (v?.src) {
          v.pause();
          const source = v.src;
          v.src = "";
          v.load();
          v.src = source;
        }

        const f =
          node?.querySelector("iframe") ||
          (node instanceof HTMLIFrameElement ? node : null);
        if (f?.src) {
          const source = f.src;
          f.src = "about:blank";
          setTimeout(() => {
            if (f) f.src = source;
          }, 0);
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [emblaApi, selectedIndex]);

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
      subscribeToChange: (callback: (idx: number) => void) => {
        listenersRef.current.push(callback);
        callback((emblaApi?.selectedScrollSnap() ?? 0) % rawTotal);
        return () => {
          listenersRef.current = listenersRef.current.filter(
            (cb) => cb !== callback,
          );
        };
      },
    };
  }, [emblaApi, rawTotal]);

  if (!renderTotal) return null;

  return (
    <div className="carousel-section-group">
      <div className="carousel-viewport-wrapper">
        <div className="modal-carousel-container embla" ref={emblaRef}>
          <div className="modal-carousel-track embla__container">
            {clonedList.map((item: MediaData, idx: number) => (
              <div
                key={`${item.src}-slide-${idx}`}
                ref={idx === selectedIndex ? activeElRef : null}
                className="modal-carousel-item embla__slide"
                style={{ flex: "0 0 100%" }}
              >
                <MemoMediaWrapper
                  item={item}
                  shouldLazyLoad={true}
                  exposedRef={{
                    get current() {
                      return slideRefs.current[idx];
                    },
                    set current(value) {
                      slideRefs.current[idx] = value;
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </div>

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
    </div>
  );
}
