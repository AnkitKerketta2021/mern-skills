import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { useState } from "react";

import Tooltip from "@mui/material/Tooltip";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import ConfirmModal from "../ui/ConfirmModal";
import AvatarViewer from "../profile/AvatarViewer";

function Avatar({ user, size = "md", onClick }) {
  const hasImage = Boolean(user?.avatarData);

  return (
    <button
      type="button"
      className={`avatar avatar-${size} ${
        hasImage ? "avatar-clickable has-image" : ""
      }`}
      onClick={onClick}
      disabled={!hasImage}
      aria-label={
        hasImage ? "View profile image" : "Profile avatar"
      }
    >
      {hasImage ? (
        <img src={user.avatarData} alt="" />
      ) : (
        (user?.name || "U").slice(0, 1).toUpperCase()
      )}
    </button>
  );
}

export default function TopNav({ onMenu }) {
  const { isAuthenticated, user, logout } = useAuth();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <header className="top-nav">

      {/* LEFT */}

      <div className="top-nav-left">
        <Tooltip
          title="Open navigation"
          placement="bottom"
          arrow
        >
          <button
            type="button"
            className="mobile-menu"
            onClick={onMenu}
            aria-label="Open navigation"
          >
            <MenuRoundedIcon />
          </button>
        </Tooltip>

        <Link to="/" className="brand">
          <span className="brand-mark">MS</span>
          <span>MERN SKILLS</span>
        </Link>
      </div>

      {/* ADMIN NAVIGATION */}

      {isAuthenticated && (
        <nav
          className="top-admin-nav"
          aria-label="Primary"
        >
          {user?.role === "SUPER_ADMIN" && (
            <>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/admin/dashboards"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Dashboards
              </NavLink>

              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Admin Settings
              </NavLink>
            </>
          )}
        </nav>
      )}

      {/* RIGHT ACTIONS */}

      <div className="nav-actions">

        <ThemeSwitcher />

        {isAuthenticated ? (
          <>
            {/* PROFILE SETTINGS */}

            <Tooltip
              title="Profile settings"
              placement="bottom"
              arrow
              enterDelay={300}
            >
              <Link
                to="/profile/settings"
                className="icon-button"
                aria-label="Profile settings"
              >
                <SettingsRoundedIcon />
              </Link>
            </Tooltip>

            {/* PROFILE */}

            <div className="profile-chip">
              <Tooltip
                title={
                  user?.avatarData
                    ? "View profile image"
                    : "Profile"
                }
                placement="bottom"
                arrow
                enterDelay={300}
              >
                <span className="profile-avatar-wrapper">
                  <Avatar
                    user={user}
                    onClick={() =>
                      setViewerOpen(true)
                    }
                  />
                </span>
              </Tooltip>

              <AvatarViewer
                open={viewerOpen}
                src={user?.avatarData}
                alt={`${user?.name || "Profile"} profile image`}
                onClose={() =>
                  setViewerOpen(false)
                }
              />

              <div className="profile-chip-copy">
                <strong>
                  {user?.name || "User"}
                </strong>

                <span>
                  {user?.role || "USER"}
                </span>
              </div>
            </div>

            {/* LOGOUT */}

            <Tooltip
              title="Sign out"
              placement="bottom"
              arrow
              enterDelay={300}
            >
              <button
                type="button"
                className="signout-button"
                onClick={() =>
                  setShowLogoutModal(true)
                }
                aria-label="Sign out"
              >
                <LogoutRoundedIcon />
              </button>
            </Tooltip>
          </>
        ) : (
          <Link
            className="nav-link"
            to="/login"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* LOGOUT CONFIRMATION */}

      <ConfirmModal
        open={showLogoutModal}
        title="Sign out of MERN SKILLS?"
        message="Your current session will be ended. You can sign in again anytime."
        confirmText="Yes, Sign Out"
        cancelText="No"
        danger={true}
        loading={loggingOut}
        onCancel={() =>
          setShowLogoutModal(false)
        }
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