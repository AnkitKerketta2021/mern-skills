import * as service from "../services/auth.service.js";
import { setSessionCookie, clearSessionCookie } from "../utils/cookies.js";

export async function signup(req, res, next) {
  try { const r = await service.signup(req.body); setSessionCookie(res, r.token); res.status(201).json({ success: true, data: { user: r.user }, message: "Account created." }); }
  catch (e) { next(e); }
}
export async function login(req, res, next) {
  try { const r = await service.login(req.body); setSessionCookie(res, r.token); res.json({ success: true, data: { user: r.user }, message: "Login successful." }); }
  catch (e) { next(e); }
}
export async function logout(req, res, next) {
  try { await service.logout(req.session); clearSessionCookie(res); res.json({ success: true, data: null, message: "Logged out." }); }
  catch (e) { next(e); }
}
export async function logoutAll(req, res, next) {
  try { await service.logoutAll(req.user._id); clearSessionCookie(res); res.json({ success: true, data: null, message: "All sessions revoked." }); }
  catch (e) { next(e); }
}
export async function me(req, res) {
  res.json({ success: true, data: { user: service.publicUser(req.user) } });
}
