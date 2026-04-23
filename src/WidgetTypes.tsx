import { useState } from "react";
import type {
  CarouselContent,
  GalleryContent,
  TextContent,
  VideoContent,
} from "./ProjectContentTypes";
import './components/styles/Carousel.css'

export const Carousel = ({carouselData}:{carouselData:CarouselContent}) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => 
  {
    setSlide(slide === carouselData.data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () =>
  {
    setSlide(slide === 0 ? carouselData.data.length - 1 : slide - 1);
  };

  return (<div className="carousel">
      <span className="material-icons arrow arrow-left" onClick={prevSlide}>arrow_back</span>
      {carouselData.data.map((item, index) => {
        return (
          <img src={item.src} alt={item.alt} key={index} className={slide === index ? "slide" : "slide slide-hidden"} />
        );
      })}
      <span className="material-icons arrow arrow-right" onClick={nextSlide}>arrow_forward</span>
      <span className="indicators">
        {carouselData.data.map((_, index) => {
        return (<button key={index} onClick={() => setSlide(index)} className={slide === index ? "indicator" : "indicator indicator-inactive" }></button>);
      })}
      </span>
    </div>);
};

export const Gallery = ({ galleryData }: { galleryData: GalleryContent }) => {
  return (
    <div className="gallery">
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
