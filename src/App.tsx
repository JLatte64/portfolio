import { useRef } from 'react'
import './App.css'

function GameProjectContent ()
{
  return (<>

  </>);
}

//Array containing ProjectWidgets for each project
const Projects = [{projectName:"GameProject",  thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent},
                  {projectName:"VFXProject",   thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent},
                  {projectName:"ShaderProject",thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent},
                  {projectName:"ToolProject",  thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent},
                  {projectName:"ModelProject", thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent},
                  {projectName:"AnimProject",  thumbnail:"content/img/landingphoto.jpg", content:GameProjectContent}
                 ];

//An array of Maps associating SHA256 hashes with different portfolio types + Projects indices.
const HashLUT = new Map(
  //Format: "hash", [Projects indices]

  //Tech Artist
  [["fde00dd35376ac0e648ad4c5c3964c4c6ddb0bcf03d4067b6c09a74286051c23", [0, 1]],
  //3D Generalist
  ["0921713ba6996dadca09bd0e13d01fd517f010fa0685b9663f9dc926397aa15b", [4, 5]]],
)

/*
function ProjectDialog({index} : {index:number})
{
  const Project = Projects[index];
  return (<>
    <Project.content/>
  </>);
}
*/

//Component to render a Project
function ProjectWidget({projectName, thumbnail} : {projectName:string, thumbnail:string}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
  <>
  <button onClick={() => {dialogRef.current?.showModal()}}>Open dialog</button>
  <a href={thumbnail}></a>
  <dialog ref={dialogRef}>
    <p>{projectName}</p>
    <button onClick={() => {dialogRef.current?.close()}}>Close</button>
  </dialog>
  </>
  )
}

//Main function
function App() {
  //location.hash.slice(1) Gets rid of the '#' character of the hash
  const PortfolioType = location.hash.slice(1);

  return (
    <>
      <section>
            <img src="content/img/landingphoto.jpg" alt="A photo of me."/>
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
    </>
  )
}

export default App

//url.com/sdhg36sda -> Tech Art samples
//url.com/3df7s -> Game samples