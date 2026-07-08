import "./styles/hero.css";
import { myinfo } from "../data/myinfo.json";
import type { Media } from "./types/MediaTypes";
import DisplayMedia from "./functions/DisplayMedia";

function Hero() {
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <header className="hero">
      <div className="hero-intro">
        <h1 id="name-title" className="hud-banner">
          {myinfo.name}
        </h1>

        <p className="hero-job-title hud-banner">{myinfo.jobTitle}</p>

        <p className="hero-loc hud-banner">
          <span className="material-icons" aria-hidden="true">
            place
          </span>
          <span className="sr-only">Location: </span>
          {myinfo.location}
        </p>

        <p className="hero-tagline hud-banner">{myinfo.tagline}</p>

        <a href="#project-links" className="cta-btn button">
          View Work
        </a>
      </div>

      <div className="hero-av-wrapper" key={heroPhoto?.id || "hero-av"}>
        <div className="hud-banner hero-av-overlay">
          <DisplayMedia
            media={heroPhoto}
            className={"hero-av"}
            shouldLazyLoad={false}
          />
        </div>
      </div>
    </header>
  );
}

export default Hero;
