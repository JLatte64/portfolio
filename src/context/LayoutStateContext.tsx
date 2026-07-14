// LayoutStateContext.tsx
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
  rememberScroll: () => void;
}

export const LayoutStateContext = createContext<
  LayoutStateContextType | undefined
>(undefined);

export const LayoutStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mountPageLayout, setMountPageLayoutState] = useState(true);

  // High-speed memory ref to preserve coordinate values across layout unmounts
  const savedScrollY = useRef(0);
  const shouldRestore = useRef(false);

  const rememberScroll = () => {
    if (typeof window !== "undefined") {
      savedScrollY.current = window.scrollY;
      console.log(
        "[LayoutState] 📥 Prior-to-Modal Capture logged position:",
        savedScrollY.current,
      );
    }
  };

  const setMountPageLayout = (mount: boolean) => {
    if (typeof window === "undefined") return;

    if (!mount) {
      setMountPageLayoutState(false);
    } else {
      shouldRestore.current = true;
      setMountPageLayoutState(true);
    }
  };

  // Synchronous layout phase restoration handles the snap BEFORE the user sees a single frame flash
  useLayoutEffect(() => {
    if (mountPageLayout && shouldRestore.current && savedScrollY.current > 0) {
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
      console.log(
        "[LayoutState] 🚀 Success! Restored scroll position to:",
        savedScrollY.current,
      );

      shouldRestore.current = false;
      savedScrollY.current = 0;
    }
  }, [mountPageLayout]);

  return (
    <LayoutStateContext.Provider
      value={{ mountPageLayout, setMountPageLayout, rememberScroll }}
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
