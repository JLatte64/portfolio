import "./styles/hero.css";
import { myinfo } from "../data/myinfo.json";
import type { Media } from "./types/MediaTypes";
import DisplayMedia from "./functions/DisplayMedia";

function Hero() {
  const heroPhoto = myinfo?.heroPhoto as Media;

  return (
    <header className="hero">
      <section className="hero-row top">
        <div className="hero-panel left">
          <h1 className="hero-title hero-text">{myinfo.name}</h1>
          <p className="hero-subtitle hero-text">{myinfo.jobTitle}</p>
        </div>
        <div className="hero-panel right">
          <DisplayMedia
            media={heroPhoto}
            className={"hero-avatar"}
            shouldLazyLoad={false}
          />
        </div>
      </section>

      <section className="hero-row bottom">
        <div className="hero-panel left">
          <p className="hero-tagline hero-text">{myinfo.tagline}</p>
          <a className="hero-cta btn" href="#project-links">
            View Work
          </a>
        </div>
      </section>
    </header>
  );
}

export default Hero;
