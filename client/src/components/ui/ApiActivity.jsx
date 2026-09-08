import { useSelector } from "react-redux";

export default function ApiActivity() {
  const pending = useSelector((state) => state.ui.apiPending);
  if (!pending) return null;
  return (
    <div className="api-activity" role="status" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  );
}
