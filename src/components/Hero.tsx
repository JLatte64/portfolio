import "./styles/Hero.css";
import landingphoto from "../assets/landingphoto.jpg";
import { myinfo } from "../data/myinfo.json";
import { useEffect, useState } from "react";

function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prevIndex) => (prevIndex + 1) % myinfo.heroSlides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      <header className="hero">
        {myinfo.heroSlides.map((srcElement, index) => (
          <img
            key={index}
            src={srcElement}
            alt="Gallery Slide"
            className={`fade-image ${index === slide ? "active" : ""}`}
          />
        ))}
        <div className="hero_content">
          <img src={landingphoto} alt="" className="hero_photo" />
          <section className="hero_text">
            <h1>Jordan Latta</h1>
            <h2>Technical Artist</h2>
            <p>
              <span className="material-icons">place</span>
              Pittsburgh, PA
            </p>
            <br />
            <p>
              Specializes in real-time rendering, shader development, and
              optimization with over a decade of self-directed experience in
              Unity.
            </p>
          </section>
        </div>
      </header>
    </>
  );
}

export default Hero;
