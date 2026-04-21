
import './App.css'
import landingphoto from "./assets/landingphoto.jpg"
import ProjectWidgetsDisplay from './assets/components/ProjectWidgetsDisplay'

//Main function
function App() {
  
  return (<>
      <section>
            <img src={landingphoto} alt="A photo of me."/>
            <p>Jordan Latta</p>
            <p>Technical Artist</p>
            <p>
                <span className="material-icons">place</span>
                Pittburgh, PA
            </p>
        </section>
        <section>
          <h1>Selected Work</h1>
          {/* Maps contents of Projects array as ProjectWidgets + Displays */}
          {<ProjectWidgetsDisplay/>}
        </section>
        <section>
          <h1>Work Snapshots</h1>
        </section>
    </>);
}

export default App