import { useContext, useEffect, useRef } from "react";
import { LayoutStateContext } from "../context/LayoutStateContext";

export function useLayoutState() {
  const context = useContext(LayoutStateContext);
  if (!context)
    throw new Error(
      "useLayoutState must be wrapped inside a LayoutStateProvider.",
    );

  const useSectionVisibility = (id: string) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isVisible = context.activeSectionIds.includes(id);

    // Read the height globally so it's present on the literal FIRST frame execution
    const currentHeight = isVisible ? "auto" : context.getCachedHeight(id);

    useEffect(() => {
      const currentRef = sectionRef;
      const unregister = context.register(id, currentRef);

      return () => {
        if (currentRef.current) {
          const height = currentRef.current.getBoundingClientRect().height;
          if (height > 0) context.cacheHeight(id, `${height}px`);
        }
        unregister();
      };
    }, [id, context]);

    return [sectionRef, isVisible, currentHeight] as const;
  };

  return {
    mountPageLayout: context.mountPageLayout,
    setMountPageLayout: context.setMountPageLayout,
    setLastScrollPos: context.setLastScrollPos,
    restoreLastScrollPos: context.restoreLastScrollPos,
    useSectionVisibility,
  };
}
