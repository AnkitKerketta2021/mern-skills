import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen grid place-items-center bg-[var(--bg)] text-[var(--muted)]">Restoring session…</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
