import { useState } from "react";
import "../components/styles/Lightbox.css"
import "../components/styles/Main.css"

export function Lightbox({src} : {src : string}) {

    const [lightboxContent, setLightboxContent] = useState("");
    const [enabled, toggleLightbox] = useState(false);
    let isShown = false;

    function handleToggle()
    {
        toggleLightbox(!enabled);
    }

    return (
        <>
            <img src={src} alt="Lightbox" className={"lightbox " +(enabled ? "shown":"hidden")}/>
            <span className={"lightbox-background " +(enabled ? "shown":"hidden")}></span>
        </>
    );
}

export default Lightbox;