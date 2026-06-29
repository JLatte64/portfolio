import { useEffect, useState } from "react";
import "../styles/button-styles/topNavButton.css";

export default function TopNavButton() {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="#top"
      className={`button top-nav-button ${isAtTop ? "is-hidden" : "is-visible"}`}
      aria-label="Back to top"
      tabIndex={isAtTop ? -1 : 0}
      aria-hidden={isAtTop ? "true" : undefined}
    >
      <span className="material-icons" aria-hidden="true">
        arrow_circle_up
      </span>
    </a>
  );
}
