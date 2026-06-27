import "./styles/hero.css";
import { heroSlides } from "../data/projects.json";
import { myinfo } from "../data/myinfo.json";
import React, { useEffect, useRef, useState } from "react";
import type { Media } from "./types/MediaTypes";
import showMedia from "./functions/DisplayMedia";
import { Link } from "react-router";
import { getPagePath } from "./functions/GetPagePath";
import "./styles/button-styles/buttons.css";
import { useDashboardState } from "./DashboardContext";

function Hero() {
  const { heroSlide, setHeroSlide, heroTimeElapsed, setHeroTimeElapsed } =
    useDashboardState();

  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = heroSlides?.length || 0;

  const lastUpdateRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(heroTimeElapsed);

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
    <>
      <header className="hero">
        <div ref={sliderRef} className="hero-slider-container">
          {heroMedia?.map((media, mediaIndex) => {
            const slideKey = media.id || `hero-slide-${mediaIndex}`;
            return (
              <React.Fragment key={slideKey}>
                {showMedia(
                  media,
                  "fade-image " + (mediaIndex === heroSlide ? "active" : ""),
                  false,
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="hero-content-container">
          <div className="hero-text-button">
            <div className="hero-text">
              <h1 className="name-title">{myinfo.name}</h1>
              <h2 className="job-title">{myinfo.jobTitle}</h2>
              <p>
                <span className="material-icons">place</span>
                {myinfo.location}
              </p>
              <p>{myinfo.tagline}</p>
            </div>
            <Link to={getPagePath("about")} className="about-button button">
              Learn About Me
            </Link>
          </div>
          <React.Fragment key={heroPhoto?.id || "hero-profile-photo"}>
            {showMedia(heroPhoto, "hero-photo", false)}
          </React.Fragment>
        </div>
      </header>
    </>
  );
}

export default Hero;
