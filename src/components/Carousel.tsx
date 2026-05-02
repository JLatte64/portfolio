import { useState } from "react";
import type { CarouselContent } from "./ProjectContentTypes";
import './styles/Carousel.css'

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

  return (<>
    <div className="carousel">
      <span className="material-icons arrow arrow-left" onClick={prevSlide}>arrow_back</span>
      {carouselData.data.map((item, index) => {
        return (
          <img src={item.src} alt={item.alt} key={index} className={slide === index ? "slide" : "slide slide-hidden"} />
        );
      })}
      <span className="material-icons arrow arrow-right" onClick={nextSlide}>arrow_forward</span>
      <span className="material-icons zoombar" onClick={nextSlide}>zoom_in</span>
    </div>
    <div className="carousel-preview">
      {carouselData.data.map((item, index) => {
        return (
          <img src={item.src} onClick={() => setSlide(index)} alt={item.alt} key={index} className={slide === index ? "preview-slide" : "preview-slide preview-slide-inactive"} />
        );
      })}
    </div>
    </>);
};