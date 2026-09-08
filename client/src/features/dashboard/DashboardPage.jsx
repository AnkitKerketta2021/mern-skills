import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const cards = [
  [
    "01",
    "Projects",
    "Organize products, experiments and delivery milestones.",
    "/projects",
  ],
  [
    "02",
    "My Skills",
    "Track the technologies and concepts you're building.",
    "/my-skills",
  ],
  [
    "03",
    "Learnings",
    "Capture the knowledge that compounds over time.",
    "/learnings",
  ],
  ["04", "Todos", "Keep execution focused and visible.", "/todos"],
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="page-section dashboard-page">
      <div className="dashboard-hero reveal-in">
        <div className="dashboard-hero-copy">
          <div className="eyebrow">PRIVATE WORKSPACE</div>
          <h1>
            Good to see you, <em>{user?.name || "there"}.</em>
          </h1>
          <p>
            Your secure session is active. This is the starting point for the
            actual MERN SKILLS product.
          </p>
        </div>
        <div className="hero-ring">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="workspace-metrics">
        {[
          ["SESSION", "Protected", "HTTP-only cookie"],
          ["ROLE", user?.role || "USER", "RBAC ready"],
          ["STATE", "Context + Redux", "Clear boundaries"],
          ["DATABASE", "MongoDB", "Mongoose session store"],
        ].map(([label, value, sub], i) => (
          <div
            className="metric-card glass-card reveal-in"
            style={{ "--delay": `${i * 80}ms` }}
            key={label}
          >
            <span className="eyebrow">{label}</span>
            <strong>{value}</strong>
            <small>{sub}</small>
          </div>
        ))}
      </div>

      <div className="section-heading compact reveal-in">
        <div>
          <div className="eyebrow">WORKSPACE MODULES</div>
          <h2>Build from here.</h2>
        </div>
      </div>
      <div className="module-grid">
        {cards.map(([number, title, description, to]) => (
          <Link
            to={to}
            key={title}
            className="module-card glass-card reveal-in"
          >
            <span className="module-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="card-arrow"><ArrowOutwardIcon /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
