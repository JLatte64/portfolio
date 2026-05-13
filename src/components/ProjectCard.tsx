import { projects } from "../data/projects.json";
import "./styles/projectcard.css";
import { Link } from "react-router";
import landingphoto from "../assets/landingphoto.jpg";

export function ProjectCard({ index }: { index: number }) {
  return (
    <Link
      to={
        "/portfolio/work#" + projects[index].title.replace(/[^a-zA-Z0-9]/g, "")
      }
      className="projectcard"
    >
      <p>{projects[index].title}</p>
      <div className="thumbnail-container">
        <img
          src={landingphoto}
          alt={projects[index].title + " photo"}
          className="thumbnail"
        ></img>
      </div>
    </Link>
  );
}
