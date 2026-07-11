export interface EmbedData {
  readonly type: "embed";
  readonly src: string;
  readonly alt?: string;
  caption?: string;
}

export interface ImageData {
  readonly type: "image";
  readonly src: string;
  readonly alt?: string;
  caption?: string;
}

export interface VideoData {
  readonly type: "video";
  readonly src: string;
  caption?: never;
}

export interface GenericData {
  readonly type: Exclude<string, "image" | "video" | "embed">;
  readonly src: string;
  readonly alt?: string;
  caption?: string;
}

export type MediaData = ImageData | EmbedData | VideoData | GenericData;
