export default function PageLoader({ label = "Loading" }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="loader-orbit">
        <span />
        <span />
        <span />
      </div>
      <div className="loader-label">{label}</div>
    </div>
  );
}
