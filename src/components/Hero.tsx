import "./styles/hero.css";
import { heroSlides } from "../data/projects.json";
import { myinfo } from "../data/myinfo.json";
import { useEffect, useRef, useState, useId } from "react";
import type { Media } from "./types/MediaTypes";
import showMedia from "./functions/DisplayMedia";
import { Link } from "react-router";
import { getPagePath } from "./functions/GetPagePath";
import { useDashboardState } from "../context/DashboardContext";
import DisplayMedia from "./functions/DisplayMedia";

function Hero() {
  const { heroSlide, setHeroSlide, heroTimeElapsed, setHeroTimeElapsed } =
    useDashboardState();

  const [isVisible, setIsVisible] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = heroSlides?.length || 0;

  const lastUpdateRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(heroTimeElapsed);
  const carouselRegionId = useId();

  useEffect(() => {
    if (!sliderRef.current) return;
    const obs = new IntersectionObserver(
      ([el]) => setIsVisible(el.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(sliderRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || totalSlides <= 1) {
      lastUpdateRef.current = null;
      return;
    }

    let frameId: number;
    lastUpdateRef.current = performance.now();

    const tick = (now: number) => {
      if (lastUpdateRef.current !== null) {
        const delta = now - lastUpdateRef.current;
        elapsedRef.current += delta;

        if (elapsedRef.current >= 3000) {
          setHeroSlide(
            elapsedRef.current >= 6000 ? 0 : (heroSlide + 1) % totalSlides,
          );
          elapsedRef.current = elapsedRef.current % 3000;
        }
      }
      lastUpdateRef.current = now;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      setHeroTimeElapsed(elapsedRef.current);
    };
  }, [isVisible, totalSlides, heroSlide, setHeroSlide, setHeroTimeElapsed]);

  const heroMedia = heroSlides as Media[];
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <header className="hero">
      <div
        ref={sliderRef}
        className="hero-slider"
        aria-hidden={true}
        id={carouselRegionId}
      >
        {heroMedia?.map((media, mediaIndex) => {
          const slideKey = media.id || `hero-slide-${mediaIndex}`;
          const isActive = mediaIndex === heroSlide;

          return (
            <div
              key={slideKey}
              className={`hero-slide ${isActive ? "is-visible" : "is-hidden"}`}
              aria-hidden={true}
            >
              <DisplayMedia
                media={media}
                className={"hero-slide-media " + (isActive ? "active" : "")}
                shouldLazyLoad={false}
              />
            </div>
          );
        })}
        <div className="hero-slider-overlay" aria-hidden={true} />
      </div>
      <section className="split-hero-content">
        <div className="hero-intro-wrapper">
          <h1 id="name-title">{myinfo.name}</h1>
          <p
            aria-label={`Job title: ${myinfo.jobTitle}`}
            aria-describedby="name-title"
            className="hero-job-title"
          >
            {myinfo.jobTitle}
          </p>

          <p className="hero-loc">
            <span className="material-icons" aria-hidden="true">
              place
            </span>
            <span className="sr-only">Location: </span>
            {myinfo.location}
          </p>

          <p className="hero-tagline">{myinfo.tagline}</p>
        </div>

        <div className="hero-av-wrapper" key={heroPhoto?.id || "hero-av"}>
          <DisplayMedia
            media={heroPhoto}
            className={"hero-av"}
            shouldLazyLoad={false}
          />
          <Link to={getPagePath("about")} className="cta-btn button-inverted">
            Learn About Me
          </Link>
        </div>
      </section>
    </header>
  );
}

export default Hero;
