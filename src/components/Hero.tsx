import "./styles/Hero.css";
import { heroSlides } from "../data/projects.json";
import { myinfo } from "../data/myinfo.json";
import { useEffect, useRef, useState } from "react";
import type { Media } from "./ProjectContentTypes";
import showMedia from "./ShowProjectMedia";
import { Link } from "react-router";
import { getPagePath } from "./GetPagePath";
import "./styles/buttons.css";

function Hero() {
  const [slide, setSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = heroSlides?.length || 0;

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
    if (!isVisible || totalSlides <= 1) return;
    const timer = setInterval(
      () => setSlide((p) => (p + 1) % totalSlides),
      3000,
    );
    return () => clearInterval(timer);
  }, [isVisible, totalSlides]);

  const heroMedia = heroSlides as Media[];
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <>
      <header className="hero">
        <div ref={sliderRef} className="hero-slider-container">
          {heroMedia?.map((media, mediaIndex) =>
            showMedia(
              media,
              "fade-image " + (mediaIndex === slide ? "active" : ""),
              false,
            ),
          )}
        </div>
        <div className="hero-content-container">
          <div className="hero-photo-text">
            {showMedia(heroPhoto, "hero-photo", false)}
            <div className="hero-text">
              <h1>{myinfo.name}</h1>
              <h2 className="job-title">{myinfo.jobTitle}</h2>
              <p>
                <span className="material-icons">place</span>
                {myinfo.location}
              </p>
              <p>{myinfo.tagline}</p>
            </div>
          </div>
          <Link to={getPagePath("about")} className="hero-about-link button">
            Learn About Me
          </Link>
        </div>
      </header>
    </>
  );
}

export default Hero;
