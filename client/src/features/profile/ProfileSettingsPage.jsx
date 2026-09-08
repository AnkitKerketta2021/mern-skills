import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { apiRequest } from "../../services/apiClient";
import AvatarCropModal from "../../components/profile/AvatarCropModal";
import AvatarViewer from "../../components/profile/AvatarViewer";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const { user, restoreSession } = useAuth();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(user?.avatarData || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => setPreview(user?.avatarData || ""), [user?.avatarData]);

  const onFile = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same image again later.
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }

    setMessage("");
    setSelectedFile(file);
    setCropOpen(true);
  };

  const onCropComplete = (dataUrl) => {
    setPreview(dataUrl);
    setSelectedFile(null);
    setCropOpen(false);

    setMessage(
      "Image cropped and optimized. Click Save avatar to update your profile.",
    );
  };

  const cancelCrop = () => {
    setSelectedFile(null);
    setCropOpen(false);
  };

  const save = async () => {
    if (!preview) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await apiRequest("/profile/avatar", {
        method: "PATCH",
        body: {
          avatarData: preview,
        },
      });

      await restoreSession();

      setMessage("Profile image saved.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-section">
      <div className="section-heading reveal-in">
        <div>
          <div className="eyebrow">PROFILE SETTINGS</div>
          <h1>Profile Settings</h1>
          <p>Manage your profile image and account security settings.</p>
        </div>
      </div>

      <div className="profile-settings-grid">
        <div className="glass-card profile-editor reveal-in">
          {/* <div className="avatar avatar-xl">
            {preview ? (
              <img src={preview} alt="Profile preview" />
            ) : (
              (user?.name || "U").slice(0, 1).toUpperCase()
            )}
          </div> */}

          <button
            type="button"
            className={`avatar avatar-xl avatar-clickable ${
              preview ? "has-image" : ""
            }`}
            onClick={() => {
              if (preview) {
                setViewerOpen(true);
              }
            }}
            disabled={!preview}
            aria-label={
              preview ? "View profile image" : "Profile image placeholder"
            }
          >
            {preview ? (
              <img src={preview} alt="Profile preview" />
            ) : (
              (user?.name || "U").slice(0, 1).toUpperCase()
            )}
          </button>

          {preview && (
            <span className="avatar-view-hint">
              Click image to view full screen
            </span>
          )}
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <div className="profile-actions">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onFile}
            />
            <button
              className="button button-secondary"
              onClick={() => inputRef.current?.click()}
            >
              Choose image
            </button>
            <button
              className="button button-primary"
              disabled={saving}
              onClick={save}
            >
              {saving ? "Saving..." : "Save avatar"}
            </button>
          </div>
          {message && <div className="inline-message">{message}</div>}
        </div>

        <div className="glass-card profile-coming reveal-in">
          <div className="eyebrow">SECURITY</div>

          <h2>Protect your account.</h2>

          <p>
            Keep your account secure by regularly updating your password and
            reviewing your security settings.
          </p>

          <div className="security-action">
            <div>
              <strong>Change Password</strong>
              <span>Update your account password.</span>
            </div>

            <button
              type="button"
              className="button button-secondary"
              onClick={() => navigate("/settings/change-password")}
            >
              Change Password
            </button>
          </div>

          <div className="coming-meta">
            <span>SECURITY</span>
            <span>SESSIONS</span>
            <span>PRIVACY</span>
          </div>
        </div>
      </div>

      <AvatarCropModal
        file={selectedFile}
        open={cropOpen}
        onCancel={cancelCrop}
        onComplete={onCropComplete}
      />

      <AvatarViewer
        open={viewerOpen}
        src={preview}
        alt={`${user?.name || "Profile"} profile image`}
        onClose={() => setViewerOpen(false)}
      />
    </section>
  );
}
