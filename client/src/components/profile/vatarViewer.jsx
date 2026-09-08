import { useEffect } from "react";

export default function AvatarViewer({
  open,
  src,
  alt = "Profile image",
  onClose,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open || !src) {
    return null;
  }

  return (
    <div
      className="avatar-viewer-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="avatar-viewer"
        role="dialog"
        aria-modal="true"
        aria-label="Profile image preview"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="avatar-viewer-close"
          onClick={onClose}
          aria-label="Close profile image"
        >
          ×
        </button>

        <img
          src={src}
          alt={alt}
          className="avatar-viewer-image"
        />
      </div>
    </div>
  );
}