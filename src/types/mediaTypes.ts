export interface MediaItem {
  src: string;
  type: "video" | "image" | "embed";
  alt?: string;
  caption?: string;
}
