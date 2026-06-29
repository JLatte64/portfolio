// src/components/ToastEmitter.tsx
import { useState, useEffect, useRef } from "react";
import "../components/styles/toastEmitter.css";

interface ToastEventDetail {
  message: string;
}

export function ToastEmitter() {
  const [message, setMessage] = useState<string>("");
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent<ToastEventDetail>;
      const toastEl = toastRef.current;
      if (!toastEl) return;

      if (timerRef.current) window.clearTimeout(timerRef.current);

      setMessage(customEvent.detail.message);

      try {
        toastEl.showPopover();
      } catch (e) {}

      timerRef.current = window.setTimeout(() => {
        try {
          toastEl.hidePopover();
        } catch (e) {}
      }, 2500);
    };

    window.addEventListener("SHOW_TOAST_TRIGGER", handleToastEvent);

    return () => {
      window.removeEventListener("SHOW_TOAST_TRIGGER", handleToastEvent);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={toastRef}
      popover="manual"
      className="toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <output className="toast-text">{message}</output>
    </div>
  );
}

ToastEmitter.show = (messageText: string): void => {
  const event = new CustomEvent<ToastEventDetail>("SHOW_TOAST_TRIGGER", {
    detail: { message: messageText },
  });
  window.dispatchEvent(event);
};
