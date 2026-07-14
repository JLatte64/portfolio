import "react";

declare module "react" {
  interface CSSProperties {
    "--modal-fade-timer"?: number;
    "--modal-backdrop-image"?: string;
  }
}

export {};
