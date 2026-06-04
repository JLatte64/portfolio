//This is where the project widgets are displayed, along with links to the contact, resume, and About pages.
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects.json";
import "../components/styles/page-styles/Home.css";
import Hero from "../components/Hero";
import ProjectDialog from "../components/ProjectDialog";
//import doublerainbow from "../assets/doublerainbow.jpg";

export function Home() {
  return (
    <>
      <Hero />
      <main>
        <div className="home-content">
          <section id="project-links">
            <h2>Portfolio</h2>
            <div className="projectcards-container">
              {projects.map((_, index) =>
                projects[index].tags?.includes("tech art") ? (
                  <div className="projectcard-container">
                    <button className="projectcard">
                      <ProjectCard index={index} key={index} />
                    </button>
                    <ProjectDialog index={index} key={index * 2 + 1} />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
