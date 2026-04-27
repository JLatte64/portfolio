import { useState } from "react";
import type { GalleryContent } from "../ProjectContentTypes";
import './styles/Gallery.css'

export const Gallery = ({ galleryData }: { galleryData: GalleryContent }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [itemIndex, setActiveItem] = useState(0);

    return (
        <div className="gallery">
        {galleryData.data.map((item, index) => {
            return (
                <>
                <button className="gallery-item"
                onMouseEnter={() => {setIsHovered(true); setActiveItem(index);} }
                onMouseLeave={() => {setIsHovered(false);}}
                onClick={() => {}}>
                    <img src={item.src} alt={item.alt} key={index}/>
                    <span className="material-icons callout">zoom_in</span>
                </button>
                </>
                
            );
        })}
        </div>
    );
};