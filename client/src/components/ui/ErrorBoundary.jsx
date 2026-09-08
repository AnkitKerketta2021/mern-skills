import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("MERN SKILLS UI error:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="fallback-screen">
        <div className="fallback-card glass-card">
          <div className="eyebrow">SYSTEM FALLBACK</div>
          <h1>Something went sideways.</h1>
          <p>The workspace hit an unexpected UI error. Return home and try again.</p>
          <Link className="button button-primary" to="/" onClick={() => window.location.reload()}>
            Return to workspace
          </Link>
        </div>
      </div>
    );
  }
}
