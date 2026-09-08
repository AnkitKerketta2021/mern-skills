import { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiClient";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    announcement: "",
    defaultTheme: "dark",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiRequest("/admin/settings")
      .then((r) => setSettings(r.data.settings))
      .catch((e) => setMessage(e.message));
  }, []);

  const save = async () => {
    try {
      const r = await apiRequest("/admin/settings", {
        method: "PATCH",
        body: settings,
      });
      setSettings(r.data.settings);
      setMessage("Application settings saved.");
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <section className="page-section">
      <div className="section-heading reveal-in">
        <div>
          <div className="eyebrow">SUPER ADMIN / CONTROL PLANE</div>
          <h1>Admin Settings</h1>
          <p>
            Application-wide controls live here. More modules can be added
            without changing the shell.
          </p>
        </div>
      </div>
      <div className="settings-layout">
        <aside className="glass-card settings-side reveal-in">
          <div className="settings-side-title">Control areas</div>
          {[
            "Application",
            "Users & Access",
            "Appearance",
            "Security",
            "Notifications",
          ].map((x, i) => (
            <div
              key={x}
              className={`settings-side-item ${i === 0 ? "active" : ""}`}
            >
              {x}
              <span>›</span>
            </div>
          ))}
        </aside>
        <div className="glass-card settings-panel reveal-in">
          <div className="eyebrow">APPLICATION</div>
          <h2>Core controls</h2>
          <div className="setting-row">
            <div>
              <strong>Maintenance mode</strong>
              <p>Show a maintenance state to non-admin users.</p>
            </div>
            <button
              className={`toggle ${settings.maintenanceMode ? "on" : ""}`}
              onClick={() =>
                setSettings({
                  ...settings,
                  maintenanceMode: !settings.maintenanceMode,
                })
              }
            >
              <span />
            </button>
          </div>
          <div className="setting-row">
            <div>
              <strong>Allow public registration</strong>
              <p>Enable or pause new account creation.</p>
            </div>
            <button
              className={`toggle ${settings.allowRegistration ? "on" : ""}`}
              onClick={() =>
                setSettings({
                  ...settings,
                  allowRegistration: !settings.allowRegistration,
                })
              }
            >
              <span />
            </button>
          </div>
          <label>
            Global announcement
            <textarea
              className="input textarea"
              rows="3"
              value={settings.announcement}
              onChange={(e) =>
                setSettings({ ...settings, announcement: e.target.value })
              }
              placeholder="Optional announcement..."
            />
          </label>
          <label>
            Default theme
            <select
              className="input"
              value={settings.defaultTheme}
              onChange={(e) =>
                setSettings({ ...settings, defaultTheme: e.target.value })
              }
            >
              <option value="dark">Dark / Noir</option>
              <option value="light">Light / Ivory</option>
              <option value="fire">Fire / Ember</option>
              <option value="ice">Ice / Frost</option>
            </select>
          </label>
          <button className="button button-primary" onClick={save}>
            Save application settings
          </button>
          {message && <div className="inline-message">{message}</div>}
        </div>
      </div>
    </section>
  );
}
