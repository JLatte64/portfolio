import { useState, useEffect } from "react";

/**
 * A custom hook that returns the current browser window width.
 * Uses debouncing to improve performance.
 */
function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    // Basic debounce to limit re-renders
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Clear existing timeout to reset the timer
      clearTimeout(timeoutId);

      // Update state only after 150ms of no resize activity
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150);
    };

    // Initial check (in case it wasn't caught by state initialization)
    window.addEventListener("resize", handleResize);

    // Cleanup: remove the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return width;
}

export default useWindowWidth;
