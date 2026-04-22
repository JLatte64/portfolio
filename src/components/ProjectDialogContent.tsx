import { Carousel, Gallery, Video, Text } from "./WidgetTypes";
import { projects } from "../projectData.json";
import type { ProjectData } from "../ProjectTypes";

const ProjectDialogContent = ({ index }: { index: number }) => {
  return (projects[index] as ProjectData).content.map((contentData) => {
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
    }
  });
};

export default ProjectDialogContent;
