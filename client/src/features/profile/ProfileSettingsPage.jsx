import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { apiRequest } from "../../services/apiClient";

export default function ProfileSettingsPage() {
  const { user, restoreSession } = useAuth();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(user?.avatarData || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => setPreview(user?.avatarData || ""), [user?.avatarData]);

  const onFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setMessage("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return setMessage("Please keep the avatar below 2 MB.");
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await apiRequest("/profile/avatar", { method: "PATCH", body: { avatarData: preview || null } });
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
          <h1>Profile Page Coming Soon</h1>
          <p>The full profile settings experience will be designed later. For now, your avatar is fully wired to the backend.</p>
        </div>
      </div>

      <div className="profile-settings-grid">
        <div className="glass-card profile-editor reveal-in">
          <div className="avatar avatar-xl">
            {preview ? <img src={preview} alt="Profile preview" /> : (user?.name || "U").slice(0, 1).toUpperCase()}
          </div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <div className="profile-actions">
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
            <button className="button button-secondary" onClick={() => inputRef.current?.click()}>Choose image</button>
            <button className="button button-primary" disabled={saving} onClick={save}>{saving ? "Saving..." : "Save avatar"}</button>
          </div>
          {message && <div className="inline-message">{message}</div>}
        </div>

        <div className="glass-card profile-coming reveal-in">
          <div className="eyebrow">PROFILE MODULE</div>
          <h2>More profile controls are coming.</h2>
          <p>Name, password, preferences, notification controls, security sessions and personal workspace settings will live here.</p>
          <div className="coming-meta"><span>IDENTITY</span><span>SECURITY</span><span>PREFERENCES</span></div>
        </div>
      </div>
    </section>
  );
}
