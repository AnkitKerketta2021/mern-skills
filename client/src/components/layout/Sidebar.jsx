import { NavLink } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

const primary = [
  ["grid", "Dashboard", "/dashboard"],
  ["folder", "Projects", "/projects"],
  ["settings", "Settings", "/profile/settings"],
  ["image", "Assets", "/assets"],
  ["check", "Todos", "/todos"],
  ["spark", "My Skills", "/my-skills"],
  ["calendar", "Calendar", "/calendar"],
];

const learning = [
  ["book", "Learnings", "/learnings"],
  ["target", "Top Concepts", "/top-concepts"],
  ["image", "Gallery", "/gallery"],
  ["bolt", "What's New", "/whats-new"],
];

function Icon({ name }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    folder: <><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06-1.7 1.7-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V20h-2.4v-.09a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-1.98.36l-.06.06-1.7-1.7.06-.06A1.8 1.8 0 0 0 8.2 15a1.8 1.8 0 0 0-1.65-1.1H6v-2.4h.55A1.8 1.8 0 0 0 8.2 10a1.8 1.8 0 0 0-.36-1.98l-.06-.06 1.7-1.7.06.06a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.1-1.65V5h2.4v.09a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.06-.06 1.7 1.7-.06.06A1.8 1.8 0 0 0 19.4 10c.2.5.65.9 1.2 1.05V13c-.55.15-1 .55-1.2 1z"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.4"/><path d="m5 17 4.5-4.5 3.2 3.2 2.2-2.2L21 19"/></>,
    check: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16.5 9"/></>,
    spark: <><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7z"/>
  };
  return <svg viewBox="0 0 24 24" className="nav-icon" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Sidebar({ open, onClose }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className={`sidebar-backdrop ${open ? "visible" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <div className="eyebrow">PRIVATE WORKSPACE</div>
          <div className="sidebar-caption">Build. Learn. Ship.</div>
        </div>

        {isAuthenticated && (
          <>
            <div className="sidebar-section">
              <div className="sidebar-section-title">Workspace</div>
              {primary.map(([icon, label, to]) => (
                <NavLink key={label} to={to} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
                  <Icon name={icon} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">Learn & Discover</div>
              {learning.map(([icon, label, to]) => (
                <NavLink key={label} to={to} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
                  <Icon name={icon} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </>
        )}

        <div className="sidebar-bottom">
          <div className="sidebar-note glass-card">
            <div className="eyebrow">PHASE 04</div>
            <strong>Workspace expansion.</strong>
            <p>Role-aware navigation, admin tools, CRUD and polished fallbacks.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
