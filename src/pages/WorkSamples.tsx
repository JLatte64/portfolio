//This is where each project is listed out in detail with their respective
//content carousels & lightboxes.
import Carousel from "../components/Carousel";
import {projects} from "../data/projects.json";
import "../components/styles/page-styles/WorkSamples.css";

export function WorkSamples() {
  return (
    <div className="content">
      {projects.map((_, index) => {
        return (
          <section id={projects[index].title.replace(/[^a-zA-Z0-9]/g, "")}>
            <h3>{projects[index].title}</h3>
            <div className="project-content-container">
              <div className="carousel-container">
                <Carousel srcArray={projects[index].carouselMedia} />
              </div>
              {projects[index].body.map((bodyContent) => {
                return (
                  <div className="body-content-container">
                    {bodyContent.media ? (
                      <img
                        src={bodyContent.media}
                        alt="Carousel Media"
                        className="body-content-media"
                      />
                    ) : null}
                    <div className="body-text">
                      {bodyContent.heading ? (
                        <h4>{bodyContent.heading}</h4>
                      ) : null}
                      {bodyContent.text ? <p>{bodyContent.text}</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
