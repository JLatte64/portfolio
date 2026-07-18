import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router";
import { ROUTE_KEYS } from "../config/routes.config";

interface LayoutStateContextType {
  mountPageLayout: boolean;
  setMountPageLayout: (mount: boolean) => void;
  setLastScrollPos: () => void;
  restoreLastScrollPos: () => void;
  activeSectionIds: string[];
  register: (
    id: string,
    ref: React.RefObject<HTMLElement | null>,
  ) => () => void;
  getCachedHeight: (id: string) => string;
  cacheHeight: (id: string, height: string) => void;
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
  const [activeSectionIds, setActiveSectionIds] = useState<string[]>([]);

  const location = useLocation();
  const scrollPositionRef = useRef(0);
  const isRestoringRef = useRef(false);

  const sectionsRefMap = useRef<
    Map<string, React.RefObject<HTMLElement | null>>
  >(new Map());
  // CRITICAL FIX: Retain heights globally so the document doesn't collapse to 0px on mount
  const heightsRef = useRef<Record<string, string>>({});

  const observerRef = useRef<IntersectionObserver | null>(null);
  if (!observerRef.current && typeof window !== "undefined") {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setActiveSectionIds((prev) => {
          const nextSet = new Set(prev);
          entries.forEach((e) => {
            const id = e.target.id;
            if (!id) return;
            if (e.isIntersecting) {
              nextSet.add(id);
            } else {
              nextSet.delete(id);
              // Lock in height immediately when it leaves the viewport
              const h = e.boundingClientRect.height;
              if (h > 0) heightsRef.current[id] = `${h}px`;
            }
          });
          return Array.from(nextSet);
        });
      },
      { rootMargin: "500px 0px" },
    );
  }

  const register = useCallback(
    (id: string, ref: React.RefObject<HTMLElement | null>) => {
      sectionsRefMap.current.set(id, ref);
      if (ref.current) observerRef.current?.observe(ref.current);
      return () => {
        if (ref.current) observerRef.current?.unobserve(ref.current);
        sectionsRefMap.current.delete(id);
      };
    },
    [],
  );

  const getCachedHeight = (id: string) => heightsRef.current[id] || "auto";
  const cacheHeight = (id: string, height: string) => {
    heightsRef.current[id] = height;
  };

  const setLastScrollPos = () => {
    if (typeof window === "undefined") return;
    scrollPositionRef.current = window.scrollY;
  };

  const restoreLastScrollPos = useCallback(() => {
    if (typeof window === "undefined") return;
    if (scrollPositionRef.current > 0) {
      isRestoringRef.current = true;
      window.scrollTo({ top: scrollPositionRef.current, behavior: "instant" });
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (mountPageLayout) {
      restoreLastScrollPos();
    }
  }, [mountPageLayout, restoreLastScrollPos]);

  useEffect(() => {
    if (isRestoringRef.current) return;

    const path = location.pathname;

    // 1. Shuts down execution if a sub-modal route opens over the layout
    if (path.includes(ROUTE_KEYS.project)) return;

    // 2. Parse the active slug from the URL path (removes leading/trailing slashes)
    //    e.g., "/about" becomes "about", "/" becomes ""
    const activeSlug = path.replace(/^\/|\/$/g, "");

    // 3. Match the target ID, default to "home" if the slug is empty (the root path)
    const targetId = activeSlug || "home";

    // 4. Extract the ref container cleanly with an O(1) direct lookup from your map
    const targetSectionRef = sectionsRefMap.current.get(targetId);

    // 5. Fire smooth scroll behavior after layout hydration finishes
    const scrollTimeout = setTimeout(() => {
      if (targetSectionRef?.current) {
        targetSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, [location.pathname]);

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
        activeSectionIds,
        register,
        getCachedHeight,
        cacheHeight,
      }}
    >
      {children}
    </LayoutStateContext.Provider>
  );
}
