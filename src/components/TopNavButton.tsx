import { useEffect, useState } from "react";
import "./styles/buttons.css";
import "./styles/topNavButton.css";

export default function TopNavButton() {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = (): void => {
      // Check if user is at the very top of the page
      setIsAtTop(window.scrollY === 0);
    };

    // Listen to window scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="#top"
      className={`material-icons button overlay-button top-nav-button ${isAtTop ? "hidden" : "visible"}`}
      aria-label="Back to top"
    >
      arrow_circle_up
    </a>
  );
}
