import "./styles/hero.css";
import { myinfo } from "../data/myinfo.json";
import type { Media } from "./types/MediaTypes";
import DisplayMedia from "./functions/DisplayMedia";

function Hero() {
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <header className="hero">
      <div className="hero-intro">
        <div className="text-wrapper">
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

        <a
          href="#project-links"
          className="cta-btn button"
          aria-label="To project links"
        >
          View Work
        </a>
      </div>

      <div className="hero-av-wrapper" key={heroPhoto?.id || "hero-av"}>
        <DisplayMedia
          media={heroPhoto}
          className={"hero-av"}
          shouldLazyLoad={false}
        />
      </div>
    </header>
  );
}

export default Hero;
