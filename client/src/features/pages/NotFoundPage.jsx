import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <section className="page-section centered-page">
      <div className="fallback-card glass-card reveal-in">
        <div className="eyebrow">404 / LOST ROUTE</div>
        <h1>That page slipped into the void.</h1>
        <p>The route does not exist or has moved. The workspace is still waiting for you.</p>
        <Link className="button button-primary" to="/">Back to workspace</Link>
      </div>
    </section>
  );
}
