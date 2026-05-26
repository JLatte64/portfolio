import "./styles/Hero.css";
import landingphoto from "../assets/landingphoto.jpg";
import {heroSlides} from "../data/projects.json";
import {myinfo} from "../data/myinfo.json";
import {useEffect, useRef, useState} from "react";
import type {Media} from "./ProjectContentTypes";
import showMedia from "./showProjectMedia";

function Hero() {
  const [slide, setSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalSlides = heroSlides.length;
    const element = sliderRef.current;

    // 1. Exit early if there are no slides or no element to watch
    if (!totalSlides || !element) return;

    let timer: ReturnType<typeof setInterval>;

    // 2. Setup observer to detect if slider is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any existing timer first
        clearInterval(timer);

        // 3. Only start the interval if the slider is visible
        if (entry.isIntersecting) {
          timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % totalSlides);
          }, 3000);
        }
      },
      {threshold: 0.1}, // Triggers when at least 10% of the slider is visible
    );

    observer.observe(element);

    // 4. Cleanup both the observer and the timer on unmount/change
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [heroSlides?.length]);

  const heroMedia = heroSlides as Media[];

  return (
    <>
      <header className="hero">
        <div ref={sliderRef} className="hero-slider-container">
          {heroMedia?.map((media, mediaIndex) =>
            showMedia(
              media,
              "fade-image " + (mediaIndex === slide ? "active" : ""),
            ),
          )}
        </div>
        <section className="hero_content">
          <img src={landingphoto} alt="" className="hero_photo" />
          <div className="hero_text">
            <h1>{myinfo.name}</h1>
            <h2 className="job-title">{myinfo.jobTitle}</h2>
            <p>
              <span className="material-icons">place</span>
              {myinfo.location}
            </p>
            <p>{myinfo.tagline}</p>
          </div>
        </section>
      </header>
    </>
  );
}

export default Hero;
