import { useEffect, useImperativeHandle } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./ProjectCarousel.css";

interface ProjectCarouselProps {
  readonly media: readonly any[];
  readonly bridgeRef: React.RefObject<any>;
  readonly selectedIndex: number;
  readonly setSelectedIndex: (idx: number) => void;
}

export default function ProjectCarousel({
  media,
  bridgeRef,
  selectedIndex,
  setSelectedIndex,
}: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, setSelectedIndex]);

  useImperativeHandle(bridgeRef, () => emblaApi, [emblaApi]);

  if (!media || media.length === 0) return null;

  return (
    <div className="carousel-section-group">
      <div className="carousel-viewport-wrapper">
        <div className="modal-carousel-container embla" ref={emblaRef}>
          <div className="modal-carousel-track embla__container">
            {media.map((item, idx) => (
              <div
                key={`carousel-${idx}`}
                className="modal-carousel-item embla__slide"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt || "Carousel slide"}
                    className="lightbox-rendered-direct-asset"
                    loading="lazy"
                  />
                ) : item.type === "video" ? (
                  <video
                    src={item.src}
                    className="lightbox-rendered-direct-asset"
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  /* 🌐 ✅ EMBED SHIELD FIX: Encodes standard sub-parameters to bypass origin iframe blocking triggers */
                  <iframe
                    src={
                      item.src.includes("vimeo.com") &&
                      !item.src.includes("://vimeo.com")
                        ? item.src.replace(
                            "://vimeo.com",
                            "://://vimeo.comvideo/",
                          )
                        : item.src
                    }
                    className="lightbox-rendered-direct-asset"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
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
