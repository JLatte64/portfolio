// src/components/MediaCarousel.tsx
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { MediaData } from "../types/mediaTypes";
import { MemoMediaWrapper } from "./RenderMedia";
import "./MediaCarousel.css";

export default function MediaCarousel({ mediaList, activeMediaRef }: any) {
  const rawTotal = mediaList?.length || 0,
    clonedList = rawTotal === 2 ? [...mediaList, ...mediaList] : mediaList,
    renderTotal = clonedList?.length || 0;
  const [emblaViewportRef, emblaApi] = useEmblaCarousel({
    loop: renderTotal > 1,
    align: "center",
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideRefs = useRef<any[]>([]),
    prevIndexRef = useRef(0),
    listeners = useRef<any[]>([]),
    initListeners = useRef<any[]>([]);

  const stopActiveMediaPlayback = () => {
    const prev = prevIndexRef.current,
      slide = slideRefs.current[prev],
      src = clonedList[prev]?.src || "unknown";
    if (!slide?.mediaElement) return;
    if (typeof slide.mediaElement.pause === "function") {
      try {
        const p = slide.mediaElement.pause();
        if (p instanceof Promise) p.catch(() => {});
      } catch {}
    } else if (
      slide.mediaElement instanceof HTMLIFrameElement &&
      slide.mediaElement.src
    ) {
      const orig = slide.mediaElement.src;
      slide.mediaElement.src = "about:blank";
      setTimeout(() => {
        if (slide.mediaElement) slide.mediaElement.src = orig;
      }, 0);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;
    prevIndexRef.current = emblaApi.selectedScrollSnap() ?? 0;

    // 🚀 Notify dashboard elements that the api instance is live and ready
    initListeners.current.forEach((cb) => cb(emblaApi));

    const handleTransition = () => {
      const current = emblaApi.selectedScrollSnap() ?? 0;
      setSelectedIndex(current);
      listeners.current.forEach((cb) => cb(current % rawTotal));
      if (prevIndexRef.current !== current) {
        stopActiveMediaPlayback();
        prevIndexRef.current = current;
      }
    };

    ["select", "reInit"].forEach((ev) =>
      emblaApi.on(ev as any, handleTransition),
    );
    return () =>
      ["select", "reInit"].forEach((ev) =>
        emblaApi.off(ev as any, handleTransition),
      );
  }, [emblaApi, rawTotal]);

  // 🚀 SINGLE REF INTERFACE: Exposes raw hooks, dynamic getters, and timing-safe registries
  useImperativeHandle(
    activeMediaRef,
    () => ({
      get emblaApi() {
        return emblaApi;
      },
      get activeMedia() {
        return slideRefs.current[emblaApi?.selectedScrollSnap() ?? 0] || null;
      },
      get selectedIndex() {
        return (emblaApi?.selectedScrollSnap() ?? 0) % rawTotal;
      },
      onInit: (cb: (api: any) => void) => {
        if (emblaApi) cb(emblaApi);
        initListeners.current.push(cb);
        return () => {
          initListeners.current = initListeners.current.filter((c) => c !== cb);
        };
      },
      onSlideChange: (cb: (idx: number) => void) => {
        listeners.current.push(cb);
        if (emblaApi) cb((emblaApi.selectedScrollSnap() ?? 0) % rawTotal);
        return () => {
          listeners.current = listeners.current.filter((c) => c !== cb);
        };
      },
    }),
    [emblaApi, rawTotal],
  );

  if (!renderTotal) return null;

  return (
    <div className="carousel-viewport-wrapper">
      <div
        className="embla"
        ref={emblaViewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Media Gallery"
        aria-live="polite"
      >
        <div className="embla__container">
          {clonedList.map((item: MediaData, idx: number) => {
            const isActive = idx === selectedIndex;
            return (
              <div
                key={`${item.src}-slide-${idx}`}
                className="embla__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${(idx % rawTotal) + 1} of ${rawTotal}`}
                inert={!isActive ? true : undefined}
                tabIndex={isActive ? 0 : -1}
              >
                <MemoMediaWrapper
                  item={item}
                  shouldLazyLoad={true}
                  exposedRef={{
                    get current() {
                      return slideRefs.current[idx];
                    },
                    set current(val) {
                      slideRefs.current[idx] = val;
                    },
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
