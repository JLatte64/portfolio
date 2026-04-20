import { useRef } from 'react'
import landingphoto from './assets/landingphoto.jpg'
import './App.css'

function GameProjectContent ()
{
  return (<>
  <p>This is a game project. Congrats!</p>
  </>);
}

//Array containing ProjectWidgets for each project
const Projects = [{widgetName:"GameProject",  widgetThumbnail:landingphoto, content:GameProjectContent},
                  {widgetName:"VFXProject",   widgetThumbnail:landingphoto, content:GameProjectContent},
                  {widgetName:"ShaderProject",widgetThumbnail:landingphoto, content:GameProjectContent},
                  {widgetName:"ToolProject",  widgetThumbnail:landingphoto, content:GameProjectContent},
                  {widgetName:"ModelProject", widgetThumbnail:landingphoto, content:GameProjectContent},
                  {widgetName:"AnimProject",  widgetThumbnail:landingphoto, content:GameProjectContent}
                 ];

//An array of Maps associating SHA256 hashes with different portfolio types + Projects indices.
const HashLUT = new Map(
  //Format: ["hash", [Projects indices]]

  //Tech Artist
  [["TA", [0, 1]],
  //3D Generalist
  ["3DG", [4, 5]]],
)

//Component to render a Project
function ProjectWidget({widgetName, widgetThumbnail, content} : {widgetName:string, widgetThumbnail:string, content:any}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function toggleDialog()
  {
    if (!dialogRef.current)
    {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal;
  }

  return (<>
    <p>{widgetName}</p>
    <a href={widgetThumbnail}></a>
    <button onClick={toggleDialog}> </button>
    
      <dialog ref={dialogRef}>
        {content}
        <button onClick={toggleDialog}>Close</button>
      </dialog>
  </>);
}

//Main function
function App() {
  //location.hash.slice(1) Gets rid of the '#' character of the hash
  const PortfolioType = location.hash.slice(1);

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
            <h1>My Work</h1>
            {/* Maps contents of Projects array as ProjectWidgets + Displays */}
            {Projects.filter((_, index) => (HashLUT.get(PortfolioType)?.includes(index))).map(Project => (<ProjectWidget {...Project}/>))}
        </section>
        <section >

        </section>
    </>);
}

export default App

//url.com/sdhg36sda -> Tech Art samples
//url.com/3df7s -> Game samples