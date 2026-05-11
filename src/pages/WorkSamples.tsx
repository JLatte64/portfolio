//This is where each project is listed out in detail with their respective
//content carousels & lightboxes.
import ContentGallery from "../components/ContentGallery";
import { projects } from "../data/projects.json";
import "../components/styles/WorkSamples.css";
import { NavBar } from "../components/NavBar";

export function WorkSamples() {
  return (
    <>
      <NavBar />
      <main>
        <div className="content">
          {projects.map((_, index) => {
            return (
              <section id={projects[index].title.replace(/[^a-zA-Z0-9]/g, "")}>
                <h3>{projects[index].title}</h3>
                <ContentGallery srcArray={projects[index].media} />
                {projects[index].body.map((text) => {
                  return (
                    <>
                      <h4>{text.heading}</h4>
                      <p>{text.text}</p>
                    </>
                  );
                })}
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
