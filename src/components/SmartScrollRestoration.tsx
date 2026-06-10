import { useEffect } from "react";
import { ScrollRestoration } from "react-router";
import { useLocation } from "react-router-dom";

export default function SmartScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable smooth scrolling right before the route transition occurs
    document.documentElement.style.scrollBehavior = "auto";

    // Re-enable smooth scrolling immediately after the DOM handles the jump
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <ScrollRestoration />;
}
