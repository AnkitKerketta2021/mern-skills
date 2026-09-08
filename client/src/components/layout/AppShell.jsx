
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, toggleSidebar } from "../../features/ui/uiSlice";
import { useAuth } from "../../app/providers/AuthProvider";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SessionGuard from "../auth/SessionGuard";
import ApiActivity from "../ui/ApiActivity";

export default function AppShell() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const open = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className={`app-shell ${isAuthenticated ? "has-workspace-sidebar" : "public-shell"}`}>
      <SessionGuard />
      <ApiActivity />
      <TopNav onMenu={() => dispatch(toggleSidebar())} />
      {isAuthenticated && <Sidebar open={open} onClose={() => dispatch(closeSidebar())} />}
      <main className="workspace-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
