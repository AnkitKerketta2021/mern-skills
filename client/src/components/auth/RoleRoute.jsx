import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function RoleRoute({ roles = [] }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!roles.includes(user?.role)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
