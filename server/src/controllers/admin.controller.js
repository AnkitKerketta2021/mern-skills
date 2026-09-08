import * as service from "../services/admin.service.js";

export async function users(req, res, next) {
  try { res.json({ success: true, data: { users: await service.listUsers() } }); } catch (e) { next(e); }
}
export async function updateUser(req, res, next) {
  try { res.json({ success: true, data: { user: await service.updateUser(req.params.id, req.body, req.user._id) } }); } catch (e) { next(e); }
}
export async function dashboards(req, res, next) {
  try { res.json({ success: true, data: { dashboards: await service.listDashboards() } }); } catch (e) { next(e); }
}
export async function createDashboard(req, res, next) {
  try { res.status(201).json({ success: true, data: { dashboard: await service.createDashboard(req.body, req.user._id) } }); } catch (e) { next(e); }
}
export async function updateDashboard(req, res, next) {
  try { res.json({ success: true, data: { dashboard: await service.updateDashboard(req.params.id, req.body) } }); } catch (e) { next(e); }
}
export async function deleteDashboard(req, res, next) {
  try { await service.deleteDashboard(req.params.id); res.json({ success: true, data: null, message: "Dashboard deleted." }); } catch (e) { next(e); }
}
export async function settings(req, res, next) {
  try { res.json({ success: true, data: { settings: await service.getSettings() } }); } catch (e) { next(e); }
}
export async function updateSettings(req, res, next) {
  try { res.json({ success: true, data: { settings: await service.updateSettings(req.body, req.user._id) } }); } catch (e) { next(e); }
}
