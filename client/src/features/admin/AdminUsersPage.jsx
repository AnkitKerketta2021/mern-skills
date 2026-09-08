import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../services/apiClient";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const result = await apiRequest("/admin/users");
      setUsers(result.data.users);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => users.filter((u) => {
    const haystack = `${u.name} ${u.email}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase()))
      && (role === "ALL" || u.role === role)
      && (status === "ALL" || (status === "ACTIVE" ? u.isActive : !u.isActive));
  }), [users, query, role, status]);

  const updateUser = async (id, patch) => {
    try {
      const result = await apiRequest(`/admin/users/${id}`, { method: "PATCH", body: patch });
      setUsers((items) => items.map((u) => u.id === id ? result.data.user : u));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="page-section">
      <div className="section-heading reveal-in">
        <div>
          <div className="eyebrow">SUPER ADMIN / USERS</div>
          <h1>User Directory</h1>
          <p>Search, filter, activate/deactivate and manage roles from one protected surface.</p>
        </div>
        <div className="stat-pill">{filtered.length} visible</div>
      </div>

      <div className="glass-card admin-toolbar reveal-in">
        <input className="input" placeholder="Search name or email..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ALL">All roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">All status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {message && <div className="inline-message">{message}</div>}

      <div className="glass-card table-wrap reveal-in">
        {loading ? <div className="table-loading">Loading users...</div> : (
          <table className="data-table">
            <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td><div className="table-user"><span className="avatar avatar-sm">{u.avatarData ? <img src={u.avatarData} alt="" /> : u.name.slice(0,1)}</span><div><strong>{u.name}</strong><small>{u.email}</small></div></div></td>
                  <td><select className="table-select" value={u.role} onChange={(e) => updateUser(u.id, { role: e.target.value })} disabled={u.role === "SUPER_ADMIN"}><option>USER</option><option>ADMIN</option><option>SUPER_ADMIN</option></select></td>
                  <td><span className={`status-dot ${u.isActive ? "on" : "off"}`}>{u.isActive ? "Active" : "Inactive"}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td><button className="table-action" onClick={() => updateUser(u.id, { isActive: !u.isActive })}>{u.isActive ? "Deactivate" : "Activate"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
