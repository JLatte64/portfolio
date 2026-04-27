import "./App.css";
import NavBar from "./components/NavBar";
import ProjectWidgetsDisplay from "./components/ProjectWidgetsDisplay";
import './components/styles/main.css'
import landingphoto from './assets/landingphoto.jpg'

//Main function
function App() {
  return (
    <>
      <NavBar />
      <section className="main">
        <div className="hero-container">
          <img src={landingphoto} alt="" />
          <div className="banner">
            <h1>Jordan Latta</h1>
            <h2>Technical Artist</h2>
            <p>
              <span className="material-icons">place</span>
              Pittsburgh, PA
            </p>
          </div>

        </div>
        <div className="nav-buttons">
          <button>About Me</button>
          <button>Get in Touch</button>
          <button>Resume</button>
        </div>
        
        <div className="spacer"></div>

        <div className="selected-work">
          <h2>Selected Work</h2>
          <ProjectWidgetsDisplay tag="selected"/>
        </div>
        
        <div className="spacer"></div>

        <div className="work-snapshots">
          <h2>Work Snapshots</h2>
          <ProjectWidgetsDisplay tag="snapshot"/>
        </div>

        <div className="spacer"></div>

        <div className="resume">
          <h2>Resume</h2>
          <button>Download PDF</button>
          <span>HTML Resume</span>
        </div>

        <div className="spacer"></div>

        <div className="contact">
          <h2>Contact</h2>
          <ul>
            <li>
              <button>LinkedIn</button>
            </li>
            <li>
              <form>
                
              </form>
            </li>
          </ul>
        </div>

      </section>
      {/* <Home />
      <About />
      <Contact />
      <Resume /> */}
    </>
  );
}

export default App;
