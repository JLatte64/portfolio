import {projects} from "../data/projects.json";
import "./styles/projectcard.css";
import landingphoto from "../assets/landingphoto.jpg";

export function ProjectCard({index}: {index: number}) {
  return (
    <div className="card-thumbnail-container">
      <img
        src={landingphoto}
        alt={projects[index].title + " photo"}
        className="card-thumbnail"
      ></img>
      <span className="card-title">{projects[index].title}</span>
    </div>
  );
}
