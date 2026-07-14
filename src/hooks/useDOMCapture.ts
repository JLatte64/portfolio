import { toSvg } from "html-to-image";
import { useState, useCallback } from "react";

export function useCaptureDOM() {
  const [pageSnapshot, setPageSnapshot] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const handleCapture = useCallback(
    async (element: HTMLElement | null): Promise<string | null> => {
      if (!element) {
        console.warn(
          "[useCaptureDOM] No valid element node provided for snapshot.",
        );
        return null;
      }

      setIsCapturing(true);

      try {
        const rect = element.getBoundingClientRect();

        const dataUrl = await toSvg(element, {
          width: rect.width,
          height: rect.height,
          backgroundColor: "#ffffff",
          skipFonts: true,
          cacheBust: true,
          style: {
            transform: "none",
            margin: "0",
            padding: "0",
          },
          pixelRatio: 0.75,
        });

        setPageSnapshot(dataUrl);
        return dataUrl;
      } catch (err) {
        console.error("[useCaptureDOM] Capture pipeline failure:", err);
        return null;
      } finally {
        setIsCapturing(false);
      }
    },
    [],
  );

  return { pageSnapshot, handleCapture, isCapturing };
}
