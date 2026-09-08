import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen grid place-items-center bg-[var(--bg)] text-[var(--muted)]">Loading…</div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
