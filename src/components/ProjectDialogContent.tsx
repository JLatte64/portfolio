import { Carousel, Gallery, Video, Text } from "../WidgetTypes";
import { projects } from "../assets/data/projects.json";
import type { ProjectData } from "../ProjectContentTypes";

const ProjectDialogContent = ({ index }: { index: number }) => {
  const Projects = (projects[index] as ProjectData).content.map((contentData) => {
    switch (contentData.type) {
      case "carousel":
        return <Carousel carouselData={contentData} />;
      case "gallery":
        return <Gallery galleryData={contentData} />;
      case "text":
        return <Text textData={contentData} />;
      case "video":
        return <Video videoData={contentData} />;
      default:
        return <p>Unknown Project Data Format.</p>;
    }});

  return (<>
    <h2>{projects[index].name}</h2>
    <h3>{projects[index].subheading}</h3>
    {Projects}
    </>);
};

export default ProjectDialogContent;
