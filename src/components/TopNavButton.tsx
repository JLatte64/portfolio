import {HashLink} from "react-router-hash-link";
import "./styles/overlaybutton.css";
import "./styles/topbutton.css";

export function TopNavButton() {
  return (
    <HashLink
      smooth
      to="#top"
      className="material-icons overlay-button top"
      aria-label="Back to top"
    >
      arrow_circle_up
    </HashLink>
  );
}

export default TopNavButton;
