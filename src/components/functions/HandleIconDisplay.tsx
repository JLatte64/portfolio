import type {
  IconData,
  ImageIconData,
  SymbolIconData,
} from "../types/IconTypes";

export function handleIconDisplay(iconData: IconData) {
  let data: ImageIconData | SymbolIconData;

  switch (iconData.type) {
    case "image":
      data = iconData as ImageIconData;
      const iconSrc = `${import.meta.env.BASE_URL}icons/${data.iconFilename}`;
      return (
        <img
          src={iconSrc}
          aria-label={iconData.ariaLabel}
          aria-hidden={!iconData.ariaLabel}
        />
      );

    case "symbol":
      data = iconData as SymbolIconData;
      return (
        <span
          className="material-icons"
          aria-label={iconData.ariaLabel}
          aria-hidden={!iconData.ariaLabel}
        >
          {data.symbolName}
        </span>
      );

    default:
      return null;
  }
}
