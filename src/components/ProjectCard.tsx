import {projects} from "../data/projects.json";
import "./styles/projectcard.css";
import {Link} from "react-router";
import landingphoto from "../assets/landingphoto.jpg";

export function ProjectCard({index}: {index: number}) {
  return (
    <Link
      to={
        "/portfolio/work#" + projects[index].title.replace(/[^a-zA-Z0-9]/g, "")
      }
      className="projectcard"
    >
      <span className="card-title">{projects[index].title}</span>
      <div className="card-thumbnail-container">
        <img
          src={landingphoto}
          alt={projects[index].title + " photo"}
          className="card-thumbnail"
        ></img>
      </div>
    </Link>
  );
}
