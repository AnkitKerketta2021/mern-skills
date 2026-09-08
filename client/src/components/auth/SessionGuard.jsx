import { useEffect } from "react";
import { useAuth } from "../../app/providers/AuthProvider";

const IDLE_MS = 30 * 60 * 1000;
const ABSOLUTE_MS = 8 * 60 * 60 * 1000;

export default function SessionGuard() {
  const { isAuthenticated, logout, expire } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    const started = Date.now();
    let idleTimer;

    const reset = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(async () => {
        await logout();
        expire();
      }, IDLE_MS);
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach(event => window.addEventListener(event, reset, { passive: true }));
    reset();

    const absoluteTimer = setTimeout(async () => {
      await logout();
      expire();
    }, ABSOLUTE_MS);

    return () => {
      events.forEach(event => window.removeEventListener(event, reset));
      clearTimeout(idleTimer);
      clearTimeout(absoluteTimer);
      void started;
    };
  }, [isAuthenticated, logout, expire]);

  return null;
}
