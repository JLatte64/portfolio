import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useRef,
} from "react";

interface LayoutStateContextType {
  mountPageLayout: boolean;
  setMountPageLayout: (mount: boolean) => void;
  setLastScrollPos: () => void;
  restoreLastScrollPos: () => void;
}

export const LayoutStateContext = createContext<
  LayoutStateContextType | undefined
>(undefined);

export const LayoutStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mountPageLayout, setMountPageLayoutState] = useState(true);

  // Use a ref to store coordinates to prevent state-induced re-render loops
  const scrollPositionRef = useRef(0);

  const setLastScrollPos = () => {
    if (typeof window === "undefined") return;
    scrollPositionRef.current = window.scrollY;
  };

  const restoreLastScrollPos = () => {
    if (typeof window === "undefined") return;

    // Check condition matching your layout mounting toggle logic
    if (!mountPageLayout && scrollPositionRef.current > 0) {
      let frameId: number;

      const performScroll = () => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      };

      // requestAnimationFrame ensures DOM has painted before applying scroll
      frameId = requestAnimationFrame(performScroll);
      return () => cancelAnimationFrame(frameId);
    }
  };

  // Run the scroll adjustment instantly before the next browser paint
  useLayoutEffect(() => {
    const cleanup = restoreLastScrollPos();
    return () => {
      if (cleanup) cleanup();
    };
  }, [mountPageLayout]);

  const setMountPageLayout = (mount: boolean) => {
    setMountPageLayoutState(mount);
  };

  return (
    <LayoutStateContext.Provider
      value={{
        mountPageLayout,
        setMountPageLayout,
        setLastScrollPos,
        restoreLastScrollPos,
      }}
    >
      {children}
    </LayoutStateContext.Provider>
  );
};

export const useLayoutState = () => {
  const context = useContext(LayoutStateContext);
  if (!context)
    throw new Error(
      "useLayoutState must be wrapped inside a <LayoutStateProvider />",
    );
  return context;
};
