import React, { useEffect, useRef, useState } from "react";
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
      slide = slideRefs.current[prev];
    if (!slide?.mediaElement) return;

    const player = slide.mediaElement;
    const isPlayerDestroyed =
      player && ("destroyed" in player ? player.destroyed : false);

    if (typeof player.pause === "function" && !isPlayerDestroyed) {
      try {
        const pausePromise = player.pause();
        if (pausePromise instanceof Promise) {
          pausePromise.catch(() => {});
        }
      } catch {}
    } else if (player instanceof HTMLIFrameElement && player.src) {
      const orig = player.src;
      player.src = "about:blank";
      setTimeout(() => {
        if (player) player.src = orig;
      }, 0);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    const syncClones = () => {
      if (rawTotal > 2) return;
      const currentSnap = emblaApi.selectedScrollSnap(),
        activeSlide = slideRefs.current[currentSnap],
        activePlayer = activeSlide?.mediaElement;
      if (
        !activePlayer ||
        typeof activePlayer.subscribe !== "function" ||
        activePlayer.state?.destroyed
      )
        return;

      return activePlayer.subscribe(({ currentTime, paused }: any) => {
        const activeSrc = clonedList[currentSnap]?.src;
        slideRefs.current.forEach((targetSlide, targetIdx) => {
          if (targetIdx === currentSnap) return;
          const clonePlayer = targetSlide?.mediaElement;
          if (
            clonePlayer &&
            clonedList[targetIdx]?.src === activeSrc &&
            typeof clonePlayer.pause === "function" &&
            !clonePlayer.state?.destroyed
          ) {
            if (Math.abs(clonePlayer.currentTime - currentTime) > 0.3)
              clonePlayer.currentTime = currentTime;
            if (paused && !clonePlayer.paused) {
              try {
                clonePlayer.pause();
              } catch {}
            } else if (!paused && clonePlayer.paused) {
              try {
                clonePlayer.play();
              } catch {}
            }
          }
        });
      });
    };

    let unsubscribeTelemetry = syncClones();
    const handleTransition = () => {
      const current = emblaApi.selectedScrollSnap() ?? 0;
      setSelectedIndex(current);
      listeners.current.forEach((cb) => cb(current % rawTotal));
      if (prevIndexRef.current !== current) {
        stopActiveMediaPlayback();
        prevIndexRef.current = current;
      }
      if (unsubscribeTelemetry) unsubscribeTelemetry();
      unsubscribeTelemetry = syncClones();
    };

    initListeners.current.forEach((cb) => cb(emblaApi));
    ["select", "reInit"].forEach((ev) =>
      emblaApi.on(ev as any, handleTransition),
    );
    return () => {
      if (unsubscribeTelemetry) unsubscribeTelemetry();
      ["select", "reInit"].forEach((ev) =>
        emblaApi.off(ev as any, handleTransition),
      );
    };
  }, [emblaApi, rawTotal, clonedList]);

  React.useImperativeHandle(
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
          {clonedList.map((item: MediaData, idx: number) => (
            <div
              key={`${item.src}-slide-${idx}`}
              className="embla__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${(idx % rawTotal) + 1} of ${rawTotal}`}
              inert={idx !== selectedIndex ? true : undefined}
              tabIndex={idx === selectedIndex ? 0 : -1}
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
          ))}
        </div>
      </div>
    </div>
  );
}
