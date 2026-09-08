import Reveal from "../../components/ui/Reveal";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const cards = [
  [
    "01",
    "React Architecture",
    "Feature modules, reusable primitives, lazy routes and a disciplined application shell.",
  ],
  [
    "02",
    "Context + Redux",
    "Context for cross-cutting concerns. Redux Toolkit for scalable product and domain state.",
  ],
  [
    "03",
    "Secure Sessions",
    "HTTP-only cookies, session rotation, expiry, logout-all and protected routes.",
  ],
  [
    "04",
    "MongoDB Core",
    "Mongoose models, indexes and session TTL ready for Compass or MongoDB Atlas.",
  ],
  [
    "05",
    "Luxury Design System",
    "Ivory, Noir, Ember and Frost themes built around scalable CSS design tokens.",
  ],
  [
    "06",
    "Motion & Performance",
    "IntersectionObserver reveals, subtle floating motion, reduced-motion support and lazy routes.",
  ],
];

export default function LandingPage() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-noise" />
        <div className="hero-glow" />
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow">MERN SKILLS / PHASE 04</span>
          </Reveal>
          <Reveal delay={90}>
            <h1>
              Where <em>engineering</em> becomes craft.
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p>
              Secure authentication, disciplined state management and a
              luxury-grade interface — built as a foundation you can keep
              extending.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="hero-actions">
              <a href="#skills" className="luxury-button">
                Explore the system <span>↓</span>
              </a>
              <Link to="/signup" className="outline-button">
                Create workspace
              </Link>
            </div>
          </Reveal>
          <div className="hero-meta">
            <span>AUTHENTICATION</span>
            <span>STATE</span>
            <span>ARCHITECTURE</span>
            <span>DESIGN</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="halo halo-a" />
          <div className="halo halo-b" />
          <div className="hero-monogram">
            <small>MS</small>
            <strong>03</strong>
            <span>SECURE CORE</span>
          </div>
          <div className="float-label label-one">REACT</div>
          <div className="float-label label-two">REDUX</div>
          <div className="float-label label-three">MONGO</div>
        </div>
      </section>

      <section className="section landing-section" id="skills">
        <Reveal>
          <div className="landing-section-heading">
            <span className="eyebrow">THE FOUNDATION</span>
            <h2>Quietly powerful. Deliberately built.</h2>
            <p>
              Each layer has one job. That makes the application easier to
              reason about today and safer to evolve tomorrow.
            </p>
          </div>
        </Reveal>
        <div className="luxury-grid">
          {cards.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 70}>
              <article className="luxury-card">
                <span className="card-number">{n}</span>
                <div className="card-line" />
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="card-arrow"><ArrowOutwardIcon /></span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section landing-section showcase" id="showcase">
        <Reveal>
          <div className="showcase-panel">
            <div>
              <span className="eyebrow">ONE SYSTEM / FOUR MOODS</span>
              <h2>Choose your atmosphere.</h2>
              <p>
                Theme changes are driven by one token layer, keeping the
                components clean and the visual identity consistent.
              </p>
            </div>
            <div className="palette">
              <span />
              <span />
              <span />
              <span />
              <b>NOIR · IVORY · EMBER · FROST</b>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section landing-section final-section">
        <Reveal>
          <span className="eyebrow">NEXT</span>
          <h2>The dashboard is waiting.</h2>
          <p>
            Authentication is now ready. The next product layer can introduce
            skill modules, progress, activity, profiles and administration.
          </p>
          <Link to="/signup" className="luxury-button">
            Enter MERN SKILLS <ArrowRightAltIcon />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
