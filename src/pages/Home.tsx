//This is where the project widgets are displayed, along with links to the contact, resume, and About pages.

import { ProjectCards } from "../components/ProjectCards";
import "../components/styles/Home.css";
import { ContactFooter } from "../components/ContactFooter";
import Hero from "../components/Hero";

export function Home() {
  return (
    <>
      <Hero />
      <main>
        <div className="home_container">
          <section id="showcase" className="home_content">
            <h3>Work Samples</h3>
            <div className="content_container">
              <ProjectCards tag="tech art" />
              <h4>Snapshots</h4>
              <ProjectCards tag="tech art" />
            </div>
          </section>
          <section id="about" className="home_content">
            <h3>More About Me</h3>
            <div className="content_container">
              <p>sdkjhsdkfhsdjfjksdfjksdfhsdjkfk</p>
              <img src="" alt="Jordan Latta photo" />
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
    </>
  );
}
