import { useRef, useState } from "react";
import { forwardRef } from "react";
import ProjectDialogContent from "./ProjectDialogContent";
import { projects } from "../projectData.json";

const ProjectDialog = forwardRef<
  HTMLDialogElement,
  { children: React.ReactNode; toggleDialog: () => void }
>(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <div>
        {children}
        <button onClick={toggleDialog}>Close</button>
      </div>
    </dialog>
  );
});

function ProjectWidget({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <button
        onClick={() => {
          setDialogContent(<ProjectDialogContent index={index} />);
          toggleDialog();
        }}
      >
        <p>{projects[index].name}</p>
        <img src={projects[index].thumbnail} alt={projects[index].alt}></img>
      </button>

      <ProjectDialog toggleDialog={toggleDialog} ref={dialogRef}>
        {dialogContent}
      </ProjectDialog>
    </>
  );
}

export default ProjectWidget;
