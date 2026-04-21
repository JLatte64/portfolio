import landingphoto from "../landingphoto.jpg"
import ProjectWidget from "./ProjectWidget"

//An array of Maps associating SHA256 hashes with different portfolio types + Projects indices.
const HashLUT = new Map(
  //Format: ["hash", [Projects indices]]

  //Tech Artist
  [["TA", [0, 1]],
  //3D Generalist
  ["3DG", [4, 5]]],
)

//Array containing ProjectWidgets for each project
const ProjectWidgets = [{widgetName:"GameProject",  widgetThumbnail:landingphoto},
                        {widgetName:"VFXProject",   widgetThumbnail:landingphoto},
                        {widgetName:"ShaderProject",widgetThumbnail:landingphoto},
                        {widgetName:"ToolProject",  widgetThumbnail:landingphoto},
                        {widgetName:"ModelProject", widgetThumbnail:landingphoto},
                        {widgetName:"AnimProject",  widgetThumbnail:landingphoto}
                       ];

const ProjectWidgetsDisplay = () => {
    //location.hash.slice(1) Gets rid of the '#' character of the hash
    const PortfolioType = location.hash.slice(1);

    return ProjectWidgets.filter((_, index) => (HashLUT.get(PortfolioType)?.includes(index))).map(Widget => (<ProjectWidget {...Widget}/>));
};

export default ProjectWidgetsDisplay;