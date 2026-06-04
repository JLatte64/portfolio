type ImageWidget = {
  type: string;
  iconFilename?: string;
  iconSymbolName?: never;
  ariaLabel: string;
};
type SymbolWidget = {
  type: string;
  iconFilename?: never;
  iconSymbolName?: string;
  ariaLabel: string;
};

export type Widget = ImageWidget | SymbolWidget;

export function handleIconDisplay(widget: Widget) {
  switch (widget.type) {
    case "image":
      return (
        <img
          src={`${import.meta.env.BASE_URL}/icons/${widget.iconFilename}`}
          aria-label={widget.ariaLabel}
          className="widget"
        />
      );
    case "symbol":
      return (
        <span className="material-icons widget">{widget.iconSymbolName}</span>
      );
  }
}
