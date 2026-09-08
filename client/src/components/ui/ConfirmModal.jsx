import { useEffect } from "react";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "Please confirm this action.",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      aria-hidden="false"
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={`modal-icon ${danger ? "danger" : ""}`}>
          {danger ? "!" : "?"}
        </div>

        <div className="eyebrow">
          CONFIRM ACTION
        </div>

        <h2 id="confirm-modal-title">
          {title}
        </h2>

        <p>
          {message}
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`button ${
              danger ? "button-danger" : "button-primary"
            }`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}