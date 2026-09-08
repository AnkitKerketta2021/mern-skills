import { Link } from "react-router-dom";
export default function UnauthorizedPage() {
  return (
    <section className="page-section centered-page">
      <div className="fallback-card glass-card reveal-in">
        <div className="eyebrow">403 / RESTRICTED</div>
        <h1>Access is intentionally limited.</h1>
        <p>Your session is valid, but your current role does not have permission to open this area.</p>
        <Link className="button button-primary" to="/dashboard">Return to dashboard</Link>
      </div>
    </section>
  );
}
