// useLayoutState.ts
import { useContext } from "react";
import { LayoutStateContext } from "../context/LayoutStateContext";

export function useLayoutState() {
  const context = useContext(LayoutStateContext);
  if (!context)
    throw new Error(
      "useLayoutState must be executed inside a <LayoutStateProvider /> tree.",
    );

  return {
    mountPageLayout: context.mountPageLayout,
    setMountPageLayout: context.setMountPageLayout,
    rememberScroll: context.rememberScroll,
  };
}
