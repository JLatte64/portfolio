import { useContext, useEffect, useRef } from "react";
import { LayoutStateContext } from "../context/LayoutStateContext";

export function useLayoutState() {
  const context = useContext(LayoutStateContext);
  if (!context)
    throw new Error(
      "useLayoutState must be wrapped inside a LayoutStateProvider.",
    );

  // This sub-hook is now completely self-contained and handles its own local section refs
  const useSectionVisibility = (id: string) => {
    const sectionRef = useRef<HTMLElement | null>(null);

    // Pure O(1) direct values look up from global context maps
    const sectionState = context.sectionsLUT[id];
    const isVisible = sectionState ? sectionState.isVisible : true;
    const currentHeight = sectionState ? sectionState.height : "auto";

    // Triggers strictly ONCE on mount for each section to handle registration natively
    useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const unregister = context.register(id, node);
      return () => unregister?.();
    }, [id]); // Only re-binds if the ID parameters change

    return [sectionRef, isVisible, currentHeight] as const;
  };

  return {
    mountPageLayout: context.mountPageLayout,
    setMountPageLayout: context.setMountPageLayout,
    setLastScrollPos: context.setLastScrollPos,
    restoreLastScrollPos: context.restoreLastScrollPos,
    useSectionVisibility, // Exposed seamlessly inside your existing hook architecture
  };
}
