import ProjectWidget from "./ProjectWidget";
import { projects } from "../projectData.json";

//An array of Maps associating SHA256 hashes with different portfolio types + Projects indices.
const HashLUT = new Map(
  //Format: ["hash", [Projects indices]]

  //Tech Artist
  [
    ["TA", [0, 1]],
    //3D Generalist
    ["3DG", [4, 5]],
  ],
);

const ProjectWidgetsDisplay = () => {
  //location.hash.slice(1) Gets rid of the '#' character of the hash
  const PortfolioType = location.hash.slice(1);

  return projects.map((_, index) =>
    HashLUT.get(PortfolioType)?.includes(index) ? (
      <ProjectWidget index={index} key={index} />
    ) : null,
  );
};

export default ProjectWidgetsDisplay;
