//src={`${import.meta.env.BASE_URL}/icons/${widget.iconFilename}`}
import showMedia from "../components/showProjectMedia";
import { myinfo } from "../data/myinfo.json";

export function ResumePage() {
  return <div className="media-container">{showMedia(myinfo.resume.pdf)}</div>;
}
