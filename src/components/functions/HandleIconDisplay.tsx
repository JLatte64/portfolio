import type {
  IconData,
  ImageIconData,
  SymbolIconData,
} from "../types/IconTypes";

export function handleIconDisplay(iconData: IconData) {
  // Security fallback gate
  if (!iconData) return null;

  // Determine if this icon has an intended context label description or is purely decorative
  const hasLabel = Boolean(
    iconData.ariaLabel && iconData.ariaLabel.trim() !== "",
  );

  switch (iconData.type) {
    case "image": {
      const data = iconData as ImageIconData;
      const iconSrc = `${import.meta.env.BASE_URL}icons/${data.iconFilename}`;

      return (
        <img
          src={iconSrc}
          /* 🚀 ACCESSIBILITY FIX: Meaningful images use 'alt', decorative images use alt="" 
             and are muted from the layout tracking layer natively */
          alt={hasLabel ? iconData.ariaLabel : ""}
          aria-hidden={!hasLabel ? "true" : undefined}
        />
      );
    }

    case "symbol": {
      const data = iconData as SymbolIconData;

      return (
        <span
          className="material-icons"
          /* 🚀 ACCESSIBILITY FIX: Font icons use aria-label ONLY if they have meaning.
             If they are decorative, we remove the label entirely and lock aria-hidden. */
          aria-label={hasLabel ? iconData.ariaLabel : undefined}
          aria-hidden={!hasLabel ? "true" : undefined}
          /* 🚀 ACCESSIBILITY FIX: If the font icon acts as a standalone interactive button graphic,
             assigning role="img" tells screen readers to read the aria-label instead of the inner text code */
          role={hasLabel ? "img" : undefined}
        >
          {data.symbolName}
        </span>
      );
    }

    default:
      return null;
  }
}
