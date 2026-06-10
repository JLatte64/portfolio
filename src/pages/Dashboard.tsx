import "../components/styles/page-styles/dashboard.css";
import Hero from "../components/Hero";
import ProjectCardGrid from "../components/ProjectCardGrid";

export function Dashboard() {
  return (
    <>
      <Hero />
      <main>
        <div className="home-content">
          <section id="project-links">
            <h2>Portfolio</h2>
            <ProjectCardGrid />
          </section>
        </div>
      </main>
    </>
  );
}
