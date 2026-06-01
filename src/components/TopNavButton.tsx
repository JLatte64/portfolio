import {HashLink} from "react-router-hash-link";
import "./styles/overlaybutton.css";
import "./styles/topnavbutton.css";
import {useEffect, useState} from "react";

export function TopNavButton() {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = (): void => {
      // Check if user is at the very top of the page
      setIsAtTop(window.scrollY === 0);
    };

    // Listen to window scroll events
    window.addEventListener("scroll", handleScroll, {passive: true});

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HashLink
      smooth
      to="#top"
      className={`material-icons overlay-button top ${isAtTop ? "hidden" : "visible"}`}
      aria-label="Back to top"
    >
      arrow_circle_up
    </HashLink>
  );
}

export default TopNavButton;
