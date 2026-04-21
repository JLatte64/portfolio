import { forwardRef } from "react";

const ProjectDialog = forwardRef<HTMLDialogElement, {children: React.ReactNode, toggleDialog: () => void}>(
({children, toggleDialog}, ref) => {
    return (
    <dialog ref={ref} onClick={(e) => 
      { if (e.currentTarget === e.target) {toggleDialog();} }}>
        <div>
            {children}
            <button onClick={toggleDialog}>Close</button>
        </div>
    </dialog>
    );
});

export default ProjectDialog;