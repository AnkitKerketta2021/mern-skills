import { User } from "../models/User.model.js";
import { Dashboard } from "../models/Dashboard.model.js";
import { AppSettings } from "../models/AppSettings.model.js";
import { publicUser } from "./auth.service.js";

export async function listUsers() {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map(publicUser);
}

export async function updateUser(id, patch, actorId) {
  const user = await User.findById(id);
  if (!user) { const e = new Error("User not found."); e.status = 404; throw e; }
  if (user.role === "SUPER_ADMIN" && id !== actorId.toString()) {
    const e = new Error("The primary Super Admin cannot be changed from this surface."); e.status = 403; throw e;
  }
  if (patch.role && !["USER", "ADMIN", "SUPER_ADMIN"].includes(patch.role)) {
    const e = new Error("Invalid role."); e.status = 400; throw e;
  }
  if (patch.role === "SUPER_ADMIN" && id !== actorId.toString()) {
    const e = new Error("Super Admin assignment is intentionally restricted."); e.status = 403; throw e;
  }
  if (typeof patch.isActive === "boolean" && id === actorId.toString() && patch.isActive === false) {
    const e = new Error("You cannot deactivate your own account."); e.status = 400; throw e;
  }
  if (patch.role) user.role = patch.role;
  if (typeof patch.isActive === "boolean") user.isActive = patch.isActive;
  await user.save();
  return publicUser(user);
}

export async function listDashboards() {
  return Dashboard.find().sort({ createdAt: -1 }).lean().then(rows => rows.map(r => ({ ...r, id: r._id.toString(), _id: undefined })));
}

export async function createDashboard(data, userId) {
  const dashboard = await Dashboard.create({ ...data, createdBy: userId });
  return { ...dashboard.toObject(), id: dashboard._id.toString() };
}

export async function updateDashboard(id, data) {
  const dashboard = await Dashboard.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!dashboard) { const e = new Error("Dashboard not found."); e.status = 404; throw e; }
  return { ...dashboard.toObject(), id: dashboard._id.toString() };
}

export async function deleteDashboard(id) {
  const result = await Dashboard.findByIdAndDelete(id);
  if (!result) { const e = new Error("Dashboard not found."); e.status = 404; throw e; }
}

export async function getSettings() {
  let settings = await AppSettings.findOne({ key: "global" });
  if (!settings) settings = await AppSettings.create({ key: "global" });
  return settings.toObject();
}

export async function updateSettings(data, userId) {
  const allowed = {
    maintenanceMode: Boolean(data.maintenanceMode),
    allowRegistration: data.allowRegistration !== false,
    announcement: String(data.announcement || "").slice(0, 500),
    defaultTheme: ["dark", "light", "fire", "ice"].includes(data.defaultTheme) ? data.defaultTheme : "dark",
    updatedBy: userId
  };
  const settings = await AppSettings.findOneAndUpdate({ key: "global" }, allowed, { new: true, upsert: true, setDefaultsOnInsert: true });
  return settings.toObject();
}
