import { useRef, useState } from "react"
import ProjectDialog from "./ProjectDialog"

function ProjectWidget({widgetName, widgetThumbnail} : {widgetName:string, widgetThumbnail:string}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  function toggleDialog()
  {
    if (!dialogRef.current) { return; }

    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (<>
    <button onClick={() => 
    {
      setDialogContent(
        <>
        {/* THIS IS WHERE THE PROJECT CONTENT GOES.*/}
        </>);
      toggleDialog(); 
    }}>
      <p>{widgetName}</p>
      <img src={widgetThumbnail}></img>
    </button>

    <ProjectDialog toggleDialog={toggleDialog} ref={dialogRef}>
      {dialogContent}
    </ProjectDialog>
  </>);
}

export default ProjectWidget;