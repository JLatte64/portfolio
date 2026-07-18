import React from "react";
import { useLayoutState } from "../../hooks/useLayoutState";

interface LazySectionProps {
  id: string;
  className?: string;
  as?: "section" | "header" | "footer" | "main" | "div";
  children: React.ReactNode;
}

export function LazySection({
  id,
  className,
  as = "section",
  children,
}: LazySectionProps) {
  const { useSectionVisibility } = useLayoutState();
  const [sectionRef, isVisible, currentHeight] = useSectionVisibility(id);

  const ComponentTag = as;

  return (
    <ComponentTag
      ref={sectionRef as React.Ref<any>}
      id={id}
      className={className}
      style={{ minHeight: currentHeight }}
    >
      {isVisible ? (
        children
      ) : (
        <div className="section-blank-placeholder" style={{ height: "100%" }}>
          THIS SECTION IS UNLOADED
        </div>
      )}
    </ComponentTag>
  );
}
