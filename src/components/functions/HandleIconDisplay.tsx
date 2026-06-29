import type {
  IconData,
  ImageIconData,
  SymbolIconData,
} from "../types/IconTypes";

export function handleIconDisplay(iconData: IconData) {
  if (!iconData) return null;

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
          aria-label={hasLabel ? iconData.ariaLabel : undefined}
          aria-hidden={!hasLabel ? "true" : undefined}
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
