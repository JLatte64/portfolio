import { createContext, useContext, useState, type ReactNode } from "react";

interface DashboardContextType {
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
  heroSlide: number;
  setHeroSlide: (slide: number) => void;
  heroTimeElapsed: number;
  setHeroTimeElapsed: (time: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroTimeElapsed, setHeroTimeElapsed] = useState(0);

  return (
    <DashboardContext.Provider
      value={{
        scrollPosition,
        setScrollPosition,
        heroSlide,
        setHeroSlide,
        heroTimeElapsed,
        setHeroTimeElapsed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardState() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboardState must be used within a DashboardProvider",
    );
  return context;
}
