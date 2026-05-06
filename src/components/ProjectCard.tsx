import { useRef } from "react";
import { projects } from "../data/projects.json";

export function ProjectCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
          toggleDialog();
        }}
      >
        <p>{projects[index].title}</p>
        <img src="" alt={projects[index].title +" photo"}></img>
      </button>
    </>
  );
}
