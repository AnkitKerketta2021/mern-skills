import { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiClient";

const empty = { title: "", description: "", status: "ACTIVE", visibility: "PRIVATE" };

export default function AdminDashboardsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const result = await apiRequest("/admin/dashboards");
      setItems(result.data.dashboards);
    } catch (error) { setMessage(error.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = editing
        ? await apiRequest(`/admin/dashboards/${editing}`, { method: "PATCH", body: form })
        : await apiRequest("/admin/dashboards", { method: "POST", body: form });
      setItems((old) => editing ? old.map((x) => x.id === editing ? result.data.dashboard : x) : [result.data.dashboard, ...old]);
      setForm(empty);
      setEditing(null);
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  };

  const edit = (item) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description || "", status: item.status, visibility: item.visibility });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this dashboard?")) return;
    try {
      await apiRequest(`/admin/dashboards/${id}`, { method: "DELETE" });
      setItems((old) => old.filter((x) => x.id !== id));
    } catch (error) { setMessage(error.message); }
  };

  return (
    <section className="page-section">
      <div className="section-heading reveal-in">
        <div><div className="eyebrow">SUPER ADMIN / DASHBOARDS</div><h1>Dashboard Studio</h1><p>Create and manage application dashboards with clean CRUD workflows.</p></div>
        <button className="button button-primary" onClick={() => { setEditing(null); setForm(empty); }}>＋ Add Dashboard</button>
      </div>

      <div className="admin-dashboard-layout">
        <form className="glass-card dashboard-form reveal-in" onSubmit={submit}>
          <div className="eyebrow">{editing ? "EDIT DASHBOARD" : "NEW DASHBOARD"}</div>
          <h2>{editing ? "Refine a dashboard" : "Create a dashboard"}</h2>
          <label>Title<input className="input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Description<textarea className="input textarea" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <div className="form-two">
            <label>Status<select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>ACTIVE</option><option>DRAFT</option><option>ARCHIVED</option></select></label>
            <label>Visibility<select className="input" value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value })}><option>PRIVATE</option><option>TEAM</option><option>PUBLIC</option></select></label>
          </div>
          <div className="profile-actions">
            <button className="button button-primary" disabled={saving}>{saving ? "Saving..." : editing ? "Update dashboard" : "Create dashboard"}</button>
            {editing && <button type="button" className="button button-secondary" onClick={() => { setEditing(null); setForm(empty); }}>Cancel</button>}
          </div>
          {message && <div className="inline-message">{message}</div>}
        </form>

        <div className="dashboard-grid">
          {loading ? <div className="glass-card table-loading">Loading dashboards...</div> : items.map((item, index) => (
            <article key={item.id} className="glass-card dashboard-admin-card reveal-in" style={{ "--delay": `${index * 60}ms` }}>
              <div className="card-glow" />
              <div className="card-topline"><span>{item.status}</span><span>{item.visibility}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description || "No description yet."}</p>
              <div className="card-actions"><button onClick={() => edit(item)}>Edit</button><button className="danger" onClick={() => remove(item.id)}>Delete</button></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
