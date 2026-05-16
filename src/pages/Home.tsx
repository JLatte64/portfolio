//This is where the project widgets are displayed, along with links to the contact, resume, and About pages.
import {ProjectCard} from "../components/ProjectCard";
import {projects} from "../data/projects.json";
import "../components/styles/page-styles/Home.css";
import Hero from "../components/Hero";
import landingphoto from "../assets/landingphoto.jpg";
import {myinfo} from "../data/myinfo.json";
import {Link} from "react-router";
import {Experience} from "./Experience";
//import doublerainbow from "../assets/doublerainbow.jpg";

export function Home() {
  return (
    <>
      <Hero />
      <main>
        <div className="home-content">
          <section id="project-links">
            <h2>Work Samples</h2>
            <div className="project-links">
              {projects.map((_, index) =>
                projects[index].tags?.includes("tech art") ? (
                  <ProjectCard index={index} key={index} />
                ) : null,
              )}
            </div>
          </section>
          <section id="about-teaser" className="about-teaser-content">
            <h2>About Me</h2>
            <div className="about-teaser">
              <p className="bio">{myinfo.about.teaser}</p>
              <div className="about-link-wrapper">
                <img
                  src={landingphoto}
                  alt="Jordan Latta photo"
                  className="about-thumbnail"
                />
                <Link to="/portfolio/about" className="about-full-link">
                  Learn More
                </Link>
              </div>
            </div>
          </section>
          <Experience />
        </div>
      </main>
    </>
  );
}
