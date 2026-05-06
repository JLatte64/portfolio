//This is where the project widgets are displayed, along with links to the contact, resume, and About pages.

import { ProjectCards } from "../components/ProjectCards";
import "../components/styles/Home.css"
import "../components/styles/Hero.css"
import "../components/styles/Main.css"
import landingphoto from "../assets/landingphoto.jpg"
import { ContactFooter } from "../components/ContactFooter";
import { NavBar } from "../components/NavBar";

export function Home() {
    return (<>
    <NavBar />
    <header>
      <img src={landingphoto} alt=""/>
      <section>
        <h1>Jordan Latta</h1>
        <h2>Technical Artist</h2>
        <div className="hero-loc">
          <span className="material-icons">place</span>
          <p>Pittsburgh, PA</p><br />
          <p>Specializes in real-time rendering, shader development, and optimization with over a decade of self-directed experience in Unity.</p>
        </div>
      </section>
    </header>
    
    <main>
      <div className="content">
        <section id="showcase">
          <h3>Work Samples</h3>
          <div className="container">
            <ProjectCards tag="tech art"/>
            <h4>Snapshots</h4>
            <ProjectCards tag="tech art"/>
          </div>
        </section>
        <section id="about">
          <h3>More About Me</h3>
          <div className="container">
            <p>sdkjhsdkfhsdjfjksdfjksdfhsdjkfk</p>
            <img src={landingphoto} alt="Jordan Latta photo" />
            <button>Click to view more about me</button>
          </div>

        </section>
      </div>
    </main>
    <footer>
      <ContactFooter />
    </footer>

{/* <header className="hero">
        
      </header>
      <main>
        <section className="main-content">
          <div className="container">
            <h3>Selected Work</h3>
            <ProjectWidgetsDisplay tag="selected"/>
          </div>
          <div className="spacer"></div>
          <div className="container">
            <h3>Work Snippets</h3>
            <ProjectWidgetsDisplay tag="snapshot"/>
          </div>
          <div className="spacer"></div>
          <div className="container">
            <h3>Resume</h3>
            <button>Download Resume (PDF)</button>
          </div>
        </section>
      </main>
      <footer className="contact">
        <h3>Get in Touch</h3>
        <div className="contact-content">
          <button>LinkedIn</button>
          <button>GitHub</button>
          <button>Artstation</button>
        </div>
        
      </footer> */}
    </>);
};