import { forwardRef } from "react";
import { Carousel } from "./Carousel";
import { Video, Text } from "./ProjectContentTypes";
import { projects } from "../data/projects.json";
import type { ProjectData } from "./ProjectContentTypes";

export const CardDialogContent = ({ index }: { index: number }) => {
  const Projects = (projects[index] as ProjectData).mediaContainer.map((contentData) => {
    switch (contentData.type) {
      case "carousel":
        return <Carousel carouselData={contentData} />;
      case "text":
        return <Text textData={contentData} />;
      case "video":
        return <Video videoData={contentData} />;
      default:
        return <p>Unknown Project Data Format.</p>;
    }});

  return (<>
    <h2>{projects[index].title}</h2>
    {Projects}
    </>);
};

export const CardDialog = forwardRef<HTMLDialogElement,{ children: React.ReactNode; toggleDialog: () => void }>(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <div>
        {children}
        <button onClick={toggleDialog}>Close</button>
      </div>
    </dialog>
  );
});