export const IconTypes = {
  IMAGE: "image",
  SYMBOL: "symbol",
} as const;

export type IconType = (typeof IconTypes)[keyof typeof IconTypes];

export interface IconData {
  type: IconType;
  ariaLabel: string;
}

export interface ImageIconData extends IconData {
  iconFilename: string;
}

export interface SymbolIconData extends IconData {
  symbolName: string;
}
