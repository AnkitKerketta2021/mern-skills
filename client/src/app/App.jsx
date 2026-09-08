import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";
import GuestRoute from "../components/auth/GuestRoute";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import PageLoader from "../components/ui/PageLoader";

const LandingPage = lazy(() => import("../features/landing/LandingPage"));
const AuthPage = lazy(() => import("../features/auth/AuthPage"));
const DashboardPage = lazy(() => import("../features/dashboard/DashboardPage"));
const ComingSoonPage = lazy(() => import("../features/pages/ComingSoonPage"));
const NotFoundPage = lazy(() => import("../features/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("../features/pages/UnauthorizedPage"));
const ProfileSettingsPage = lazy(() => import("../features/profile/ProfileSettingsPage"));
const AdminUsersPage = lazy(() => import("../features/admin/AdminUsersPage"));
const AdminDashboardsPage = lazy(() => import("../features/admin/AdminDashboardsPage"));
const AdminSettingsPage = lazy(() => import("../features/admin/AdminSettingsPage"));

function ProtectedComingSoon({ title, eyebrow }) {
  return <ComingSoonPage title={title} eyebrow={eyebrow} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader label="Loading workspace" />}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
          </Route>

          <Route element={<AppShell />}>
            <Route path="/" element={<LandingPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProtectedComingSoon eyebrow="WORKSPACE" title="Projects coming soon" />} />
              <Route path="/assets" element={<ProtectedComingSoon eyebrow="WORKSPACE" title="Assets coming soon" />} />
              <Route path="/todos" element={<ProtectedComingSoon eyebrow="WORKSPACE" title="Todos coming soon" />} />
              <Route path="/my-skills" element={<ProtectedComingSoon eyebrow="WORKSPACE" title="My Skills coming soon" />} />
              <Route path="/calendar" element={<ProtectedComingSoon eyebrow="WORKSPACE" title="Calendar coming soon" />} />
              <Route path="/learnings" element={<ProtectedComingSoon eyebrow="LEARNINGS" title="Learnings coming soon" />} />
              <Route path="/top-concepts" element={<ProtectedComingSoon eyebrow="LEARNINGS" title="Top Concepts coming soon" />} />
              <Route path="/gallery" element={<ProtectedComingSoon eyebrow="LEARNINGS" title="Gallery coming soon" />} />
              <Route path="/whats-new" element={<ProtectedComingSoon eyebrow="LEARNINGS" title="What's New coming soon" />} />
              <Route path="/profile/settings" element={<ProfileSettingsPage />} />
            </Route>

            <Route element={<RoleRoute roles={["SUPER_ADMIN"]} />}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/dashboards" element={<AdminDashboardsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
