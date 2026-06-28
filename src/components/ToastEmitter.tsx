// src/components/ToastEmitter.tsx
import React, { useState, useEffect, useRef } from "react";
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

      // 1. Clear out any active auto-hide timers
      if (timerRef.current) window.clearTimeout(timerRef.current);

      // 2. Load the string message instantly
      setMessage(customEvent.detail.message);

      // 3. Native Popover API: Float the item safely to the top layer layout stack
      try {
        toastEl.showPopover();
      } catch (e) {}

      // 4. Auto-hide and drop out of view cleanly after 2.5 seconds
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

// Unified static launcher method
ToastEmitter.show = (messageText: string): void => {
  const event = new CustomEvent<ToastEventDetail>("SHOW_TOAST_TRIGGER", {
    detail: { message: messageText },
  });
  window.dispatchEvent(event);
};
