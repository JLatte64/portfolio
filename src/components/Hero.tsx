import "./styles/Hero.css";
import landingphoto from "../assets/landingphoto.jpg";
import {myinfo} from "../data/myinfo.json";
import {useEffect, useRef, useState} from "react";

function Hero() {
  const [slide, setSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalSlides = myinfo?.heroSlides?.length;
    const element = sliderRef.current;

    // 1. Exit early if there are no slides or no element to watch
    if (!totalSlides || !element) return;

    let timer: ReturnType<typeof setInterval>;

    // 2. Setup observer to detect if slider is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any existing timer first
        clearInterval(timer);

        // 3. Only start the interval if the slider is visible
        if (entry.isIntersecting) {
          timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % totalSlides);
          }, 3000);
        }
      },
      {threshold: 0.1}, // Triggers when at least 10% of the slider is visible
    );

    observer.observe(element);

    // 4. Cleanup both the observer and the timer on unmount/change
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [myinfo?.heroSlides?.length]);

  return (
    <>
      <header className="hero">
        <div ref={sliderRef} className="hero-slider-container">
          {myinfo.heroSlides.map((srcElement, index) => (
            <img
              key={index}
              src={srcElement}
              alt="Gallery Slide"
              className={"fade-image " + (index === slide ? "active" : "")}
            />
          ))}
        </div>

        <section className="hero_content">
          <img src={landingphoto} alt="" className="hero_photo" />
          <div className="hero_text">
            <h1>Jordan Latta</h1>
            <h2>Technical Artist</h2>
            <p className="loc">
              <span className="material-icons">place</span>
              Pittsburgh, PA
            </p>
            <p>
              Specializes in real-time rendering, shader development, and
              optimization with over a decade of self-directed experience in
              Unity.
            </p>
          </div>
        </section>
      </header>
    </>
  );
}

export default Hero;
