import { ToastEmitter } from "../ToastEmitter";

export const handleCopyLink = async ({ link }: { link: string }) => {
  try {
    const copyUrl = `${window.location.origin}/${link}`;
    await navigator.clipboard.writeText(copyUrl);

    ToastEmitter.show("Link copied to clipboard!");
  } catch (err) {
    ToastEmitter.show("Failed to copy link.");
  }
};
