import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CROP_SIZE = 360;
const OUTPUT_SIZE = 512;

const MAX_OUTPUT_BYTES = 1.8 * 1024 * 1024;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

async function canvasToAvatarDataUrl(canvas) {
  let quality = 0.9;

  for (let attempt = 0; attempt < 7; attempt += 1) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);

    const bytes = Math.ceil((dataUrl.length * 3) / 4);

    if (bytes <= MAX_OUTPUT_BYTES || quality <= 0.55) {
      return dataUrl;
    }

    quality -= 0.07;
  }

  return canvas.toDataURL("image/jpeg", 0.55);
}

export default function AvatarCropModal({
  file,
  open,
  onCancel,
  onComplete,
}) {
  const imageRef = useRef(null);
  const dragRef = useRef(null);

  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !file) {
      return undefined;
    }

    const url = URL.createObjectURL(file);

    setImageUrl(url);
    setImageSize(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setProcessing(false);
    setError("");

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, open]);

  // Prevent page scrolling while crop modal is open.
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !processing) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, processing, onCancel]);

  // Scale original image so it completely covers the crop square.
  const scale = useMemo(() => {
    if (!imageSize) {
      return 1;
    }

    return Math.max(
      CROP_SIZE / imageSize.width,
      CROP_SIZE / imageSize.height,
    );
  }, [imageSize]);

  const displaySize = useMemo(() => {
    if (!imageSize) {
      return {
        width: CROP_SIZE,
        height: CROP_SIZE,
      };
    }

    return {
      width: imageSize.width * scale * zoom,
      height: imageSize.height * scale * zoom,
    };
  }, [imageSize, scale, zoom]);

  const clampPosition = useCallback(
    (nextPosition, nextZoom = zoom) => {
      if (!imageSize) {
        return nextPosition;
      }

      const width =
        imageSize.width * scale * nextZoom;

      const height =
        imageSize.height * scale * nextZoom;

      const minX = (CROP_SIZE - width) / 2;
      const maxX = (width - CROP_SIZE) / 2;

      const minY = (CROP_SIZE - height) / 2;
      const maxY = (height - CROP_SIZE) / 2;

      return {
        x: clamp(nextPosition.x, minX, maxX),
        y: clamp(nextPosition.y, minY, maxY),
      };
    },
    [imageSize, scale, zoom],
  );

  const handleImageLoad = () => {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    setImageSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  };

  const handleZoom = (event) => {
    const nextZoom = Number(event.target.value);

    setZoom(nextZoom);

    setPosition((current) =>
      clampPosition(current, nextZoom),
    );
  };

  const handlePointerDown = (event) => {
    if (!imageSize || processing) {
      return;
    }

    event.currentTarget.setPointerCapture?.(
      event.pointerId,
    );

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (
      !drag ||
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    setPosition(
      clampPosition({
        x:
          drag.originX +
          event.clientX -
          drag.startX,

        y:
          drag.originY +
          event.clientY -
          drag.startY,
      }),
    );
  };

  const handlePointerUp = (event) => {
    if (
      dragRef.current?.pointerId ===
      event.pointerId
    ) {
      dragRef.current = null;
    }
  };

  const crop = async () => {
    if (
      !imageRef.current ||
      !imageSize ||
      processing
    ) {
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const canvas =
        document.createElement("canvas");

      // Final image is always 512 × 512.
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;

      const context = canvas.getContext("2d", {
        alpha: false,
      });

      if (!context) {
        throw new Error(
          "Your browser cannot process this image.",
        );
      }

      const displayWidth = displaySize.width;
      const displayHeight = displaySize.height;

      const left =
        (CROP_SIZE - displayWidth) / 2 +
        position.x;

      const top =
        (CROP_SIZE - displayHeight) / 2 +
        position.y;

      const displayScale =
        displayWidth / imageSize.width;

      const sourceX = Math.max(
        0,
        -left / displayScale,
      );

      const sourceY = Math.max(
        0,
        -top / displayScale,
      );

      const sourceSize =
        CROP_SIZE / displayScale;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        imageRef.current,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        OUTPUT_SIZE,
        OUTPUT_SIZE,
      );

      const dataUrl =
        await canvasToAvatarDataUrl(canvas);

      onComplete(dataUrl);
    } catch (cropError) {
      setError(
        cropError.message ||
          "Unable to process this image.",
      );

      setProcessing(false);
    }
  };

  if (!open || !file) {
    return null;
  }

  return (
    <div
      className="avatar-crop-backdrop"
      role="presentation"
    >
      <div
        className="avatar-crop-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-crop-title"
      >
        <div className="avatar-crop-header">
          <div>
            <span className="eyebrow">
              PROFILE IMAGE
            </span>

            <h2 id="avatar-crop-title">
              Crop your avatar
            </h2>

            <p>
              Drag the image to position it.
              The final avatar is automatically
              resized and compressed.
            </p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onCancel}
            disabled={processing}
            aria-label="Close crop dialog"
          >
            ×
          </button>
        </div>

        <div
          className="avatar-crop-stage"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {imageUrl && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Crop preview"
              className="avatar-crop-image"
              draggable="false"
              onLoad={handleImageLoad}
              style={{
                width: `${displaySize.width}px`,
                height: `${displaySize.height}px`,
                transform: `
                  translate(
                    calc(-50% + ${position.x}px),
                    calc(-50% + ${position.y}px)
                  )
                `,
              }}
            />
          )}

          <div className="avatar-crop-frame" />
          <div className="avatar-crop-vignette" />
        </div>

        <div className="avatar-crop-controls">
          <span>−</span>

          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={handleZoom}
            aria-label="Zoom image"
          />

          <span>+</span>
        </div>

        {error && (
          <div className="form-alert form-alert-error">
            {error}
          </div>
        )}

        <div className="avatar-crop-footer">
          <div className="avatar-crop-meta">
            512 × 512 • JPEG • optimized for
            profile use
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onCancel}
              disabled={processing}
            >
              Cancel
            </button>

            <button
              type="button"
              className="button button-primary"
              onClick={crop}
              disabled={
                processing || !imageSize
              }
            >
              {processing
                ? "Processing..."
                : "Crop & Use Image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}