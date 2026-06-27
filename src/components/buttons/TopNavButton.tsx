import { useEffect, useState } from "react";
import "../styles/button-styles/topNavButton.css";

export default function TopNavButton() {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="#top"
      className={`material-icons button top-nav-button ${isAtTop ? "hidden" : "visible"}`}
      aria-label="Back to top"
    >
      arrow_circle_up
    </a>
  );
}
