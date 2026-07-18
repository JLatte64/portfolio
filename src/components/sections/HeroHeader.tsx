import "./HeroHeader.css";
import { LazySection } from "./LazySection";

export default function HeroHeader() {
  return (
    <LazySection id="hero" as="header">
      Hey, this is a header!
    </LazySection>
  );
}
