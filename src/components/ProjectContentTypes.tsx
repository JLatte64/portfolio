export type ProjectContent =
  | CarouselContent
  | VideoContent
  | GalleryContent
  | TextContent;

export type ProjectData = {
  title: string;
  thumbnail: string;
  alt:string;
  tags:string[];
  textContainer: ProjectContent[];
  mediaContainer: ProjectContent;
};

export type CarouselContent = {
  type: "carousel";
  data: {
    src: string;
    alt: string;
  }[];
};

export type VideoContent = {
  type: "video";
  data: string;
};

export type GalleryContent = {
  type: "gallery";
  data: {
    src: string;
    alt: string;
  }[];
};

export type TextContent = {
  type: "text";
  data: string;
};

export const Text = ({ textData }: { textData: TextContent }) => {
  return (
    <div>
      <p>{textData.data}</p>
    </div>
  );
};

export const Video = ({ videoData }: { videoData: VideoContent }) => {
  // const ext = videoData.data.split(".").at(-1);

  return (
    <div>
      <video src={videoData.data}>Your browser does not support the video tag.</video>
    </div>
  );
  {
    /* 
        return <iframe width="560" height="315" src={videoData.data} title="YouTube video player" 
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe> 
    */
  }
};
