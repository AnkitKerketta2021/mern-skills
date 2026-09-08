import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";

function Avatar({ user, size = "md" }) {
  return (
    <span className={`avatar avatar-${size}`}>
      {user?.avatarData ? (
        <img src={user.avatarData} alt="" />
      ) : (
        (user?.name || "U").slice(0, 1).toUpperCase()
      )}
    </span>
  );
}

export default function TopNav({ onMenu }) {
  const { isAuthenticated, user, logout } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button
          className="mobile-menu"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="brand">
          <span className="brand-mark">MS</span>
          <span>MERN SKILLS</span>
        </Link>
      </div>

      {isAuthenticated && (
        <nav className="top-admin-nav" aria-label="Primary">
          {user?.role === "SUPER_ADMIN" && (
            <>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Users
              </NavLink>
              <NavLink
                to="/admin/dashboards"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboards
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Admin Settings
              </NavLink>
            </>
          )}
        </nav>
      )}

      <div className="nav-actions">
        <ThemeSwitcher />
        {isAuthenticated ? (
          <>
            <Link
              to="/profile/settings"
              className="icon-button"
              aria-label="Profile settings"
              title="Profile settings"
            >
              ⚙
            </Link>
            <div className="profile-chip">
              <Avatar user={user} />
              <div className="profile-chip-copy">
                <strong>{user?.name || "User"}</strong>
                <span>{user?.role || "USER"}</span>
              </div>
            </div>
            <button
              className="signout-button"
              onClick={() => setShowLogoutModal(true)}
              aria-label="Sign out"
              title="Sign out"
            >
              ↗
            </button>
          </>
        ) : (
          <Link className="nav-link" to="/login">
            Sign in
          </Link>
        )}
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="Sign out of MERN SKILLS?"
        message="Your current session will be ended. You can sign in again anytime."
        confirmText="Yes, Sign Out"
        cancelText="No"
        danger
        loading={loggingOut}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={async () => {
          setLoggingOut(true);

          try {
            await logout();
          } finally {
            setLoggingOut(false);
            setShowLogoutModal(false);
          }
        }}
      />
    </header>
  );
}
