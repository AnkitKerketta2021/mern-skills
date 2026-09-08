import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import Reveal from "../../components/ui/Reveal";

export default function AuthPage({ mode }) {
  const signup = mode === "signup";
  const navigate = useNavigate();
  const { login, signup: createAccount } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault(); setError("");
    if (signup && form.password !== form.confirmPassword) return setError("Passwords do not match.");
    setBusy(true);
    try {
      if (signup) await createAccount(form);
      else await login({ email: form.email, password: form.password });
      navigate("/dashboard", { replace:true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <div className="auth-page">
    <section className="auth-art">
      <Link to="/" className="brand"><span className="brand-mark">MS</span>MERN SKILLS</Link>
      <div className="auth-art-content"><span className="eyebrow">PHASE 03 / SECURE CORE</span><h1>Engineering with elegance.</h1><p>A premium MERN foundation where security, architecture and visual craft meet.</p><div className="auth-art-line"/></div>
      <div className="auth-orbit"><div/><div/><div/></div>
    </section>
    <section className="auth-panel"><div className="auth-box"><Link to="/" className="mobile-auth-logo">MS</Link><Reveal><span className="eyebrow">{signup ? "CREATE ACCOUNT" : "WELCOME BACK"}</span><h2>{signup ? "Begin your journey." : "Welcome back."}</h2><p className="muted">Your session is secured by an HTTP-only cookie.</p></Reveal>
      <form onSubmit={submit}>
        {signup && <Field label="Full name" name="name" value={form.name} onChange={update} placeholder="Your name" />}
        <Field label="Email address" type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" />
        <Field label="Password" type="password" name="password" value={form.password} onChange={update} placeholder="8+ characters" />
        {signup && <Field label="Confirm password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={update} placeholder="Repeat password" />}
        {error && <div className="auth-error">{error}</div>}
        <button className="luxury-button" disabled={busy}>{busy ? "Authenticating…" : signup ? "Create account  →" : "Sign in  →"}</button>
      </form>
      <p className="auth-switch">{signup ? "Already registered?" : "New to MERN SKILLS?"} <Link to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create an account"}</Link></p>
    </div></section>
  </div>;
}

function Field({ label, ...props }) {
  return <label className="field">{label}<input required minLength={props.type === "password" ? 8 : undefined} {...props}/></label>;
}
