import type {
  CarouselContent,
  GalleryContent,
  TextContent,
  VideoContent,
} from "../ProjectTypes";

export const Carousel = ({
  carouselData,
}: {
  carouselData: CarouselContent;
}) => {
  return (
    <div>
      {carouselData.data.map((item, index) => {
        return (
          <img src={item.src} alt={item.alt} key={index} className="slide" />
        );
      })}
    </div>
  );
};

export const Gallery = ({ galleryData }: { galleryData: GalleryContent }) => {
  return (
    <div>
      {galleryData.data.map((item, index) => {
        return (
          <img src={item.src} alt={item.alt} key={index} className="slide" />
        );
      })}
    </div>
  );
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
      <video src={videoData.data}></video>
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
