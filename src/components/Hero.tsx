import "./styles/hero.css";
import { myinfo } from "../data/myinfo.json";
import type { Media } from "./types/MediaTypes";
import DisplayMedia from "./functions/DisplayMedia";

function Hero() {
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <header className="hero">
      <section className="intro hud-banner">
        <h1 id="name-title">{myinfo.name}</h1>

        <p className="hero-job-title">{myinfo.jobTitle}</p>

        <p className="hero-loc">
          <span className="material-icons" aria-hidden="true">
            place
          </span>
          <span className="sr-only">Location: </span>
          {myinfo.location}
        </p>

        <p className="hero-tagline">{myinfo.tagline}</p>

        <a href="#project-links" className="cta-btn button hud-banner">
          View Work
        </a>
      </section>

      <section className="av ">
        <div className="av-wrapper hud-banner">
          <DisplayMedia
            media={heroPhoto}
            className={"hero-av"}
            shouldLazyLoad={false}
          />
        </div>
      </section>
    </header>
  );
}

export default Hero;
