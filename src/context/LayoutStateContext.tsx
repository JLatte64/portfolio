import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

export interface SectionState {
  isVisible: boolean;
  height: string;
}

interface LayoutStateContextType {
  mountPageLayout: boolean;
  setMountPageLayout: (mount: boolean) => void;
  setLastScrollPos: () => void;
  restoreLastScrollPos: () => void;
  sectionsLUT: Record<string, SectionState>;
  register: (id: string, node: HTMLElement | null) => (() => void) | undefined;
}

export const LayoutStateContext = createContext<
  LayoutStateContextType | undefined
>(undefined);

export function LayoutStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mountPageLayout, setMountPageLayoutState] = useState(true);
  const [sectionsLUT, setSectionsLUT] = useState<Record<string, SectionState>>(
    {},
  );
  const scrollPositionRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize the single global observer instance once at the AppShell root layer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setSectionsLUT((prev) => {
          const next = { ...prev };
          let hasChanges = false;

          // High-performance pointer loop to safely handle batched rotation changes
          for (const entry of entries) {
            const id = entry.target.id;
            if (!id) continue;

            const isIntersecting = entry.isIntersecting;
            const current = prev[id];

            if (isIntersecting) {
              // ONSCREEN: Unlock height to let responsive CSS flow fluidly during mobile rotations
              if (!current || !current.isVisible || current.height !== "auto") {
                next[id] = { isVisible: true, height: "auto" };
                hasChanges = true;
              }
            } else {
              // OFFSCREEN: Snapshot exact current height right before short-circuiting content
              const rect = entry.target.getBoundingClientRect();
              const measuredHeight =
                rect.height > 0 ? `${rect.height}px` : "auto";

              if (
                !current ||
                current.isVisible ||
                current.height !== measuredHeight
              ) {
                next[id] = { isVisible: false, height: measuredHeight };
                hasChanges = true;
              }
            }
          }
          return hasChanges ? next : prev;
        });
      },
      { rootMargin: "500px 0px" },
    ); // 500px pre-loading buffer

    return () => observerRef.current?.disconnect();
  }, []);

  // Shared registration callback used natively by sections
  const register = useCallback((id: string, node: HTMLElement | null) => {
    if (!observerRef.current || !node) return;
    observerRef.current.observe(node);

    return () => {
      observerRef.current?.unobserve(node);
      setSectionsLUT((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    };
  }, []);

  const setLastScrollPos = () => {
    if (typeof window === "undefined") return;
    scrollPositionRef.current = window.scrollY;
  };

  const restoreLastScrollPos = () => {
    if (typeof window === "undefined") return;
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: "instant" });
    }
  };

  useEffect(() => {
    restoreLastScrollPos();
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
        sectionsLUT,
        register,
      }}
    >
      {children}
    </LayoutStateContext.Provider>
  );
}
