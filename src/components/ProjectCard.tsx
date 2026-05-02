import { useRef, useState } from "react";
import { projects } from "../data/projects.json";
import { CardDialog, CardDialogContent } from "./CardDialog"

export function ProjectCard({ index }: { index: number }) {
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
          setDialogContent(<CardDialogContent index={index} />);
          toggleDialog();
        }}
      >
        <p>{projects[index].title}</p>
        <img src="" alt={projects[index].title +" photo"}></img>
      </button>

      <CardDialog toggleDialog={toggleDialog} ref={dialogRef}>
        {dialogContent}
      </CardDialog>
    </>
  );
}
