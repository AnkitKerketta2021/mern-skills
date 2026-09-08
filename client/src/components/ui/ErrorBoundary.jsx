import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MERN SKILLS UI error:", error);
    console.error("Component stack:", errorInfo?.componentStack);
  }

  render() {
    const { hasError, error } = this.state;

    if (!hasError) {
      return this.props.children;
    }

    return (
      <div className="fallback-screen">
        <div className="fallback-card glass-card">
          <div className="eyebrow">SYSTEM FALLBACK</div>

          <h1>Something went sideways.</h1>

          <p>
            The workspace hit an unexpected UI error. Return home and try
            again.
          </p>

          {/* TEMPORARY DEBUG INFORMATION */}
          {import.meta.env.DEV && error && (
            <details className="fallback-debug">
              <summary>Developer error details</summary>

              <div className="fallback-debug-content">
                <strong>{error.name}</strong>

                <pre>{error.message}</pre>

                {error.stack && (
                  <pre className="fallback-stack">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}

          <Link
            className="button button-primary"
            to="/"
            onClick={() => window.location.reload()}
          >
            Return to workspace
          </Link>
        </div>
      </div>
    );
  }
}