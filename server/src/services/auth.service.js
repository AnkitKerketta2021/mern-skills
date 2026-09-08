import { User } from "../models/User.model.js";
import { Session } from "../models/Session.model.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createSessionToken, hashToken } from "../utils/tokens.js";
import { SERVER_CONFIG } from "../config/env.js";

export const publicUser = (u) => ({
  id: u._id.toString(),
  name: u.name,
  email: u.email,
  role: u.role,
  isActive: u.isActive,
  avatarData: u.avatarData || null,
  createdAt: u.createdAt,
  lastLoginAt: u.lastLoginAt
});

async function createSession(userId) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SERVER_CONFIG.sessionTtlMinutes * 60000);
  const absoluteExpiresAt = new Date(Date.now() + SERVER_CONFIG.absoluteSessionHours * 3600000);
  await Session.create({ userId, tokenHash: hashToken(token), expiresAt, absoluteExpiresAt });
  return token;
}

export async function signup({ name, email, password }) {
  const normalized = email.toLowerCase().trim();
  if (await User.findOne({ email: normalized })) {
    const e = new Error("An account with this email already exists.");
    e.status = 409; e.code = "EMAIL_EXISTS"; throw e;
  }
  const user = await User.create({ name: name.trim(), email: normalized, passwordHash: await hashPassword(password) });
  return { user: publicUser(user), token: await createSession(user._id) };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
  if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
    const e = new Error("Invalid email or password.");
    e.status = 401; e.code = "AUTH_INVALID_CREDENTIALS"; throw e;
  }
  user.lastLoginAt = new Date();
  await user.save();
  return { user: publicUser(user), token: await createSession(user._id) };
}

export async function logout(session) { if (session) await Session.deleteOne({ _id: session._id }); }
export async function logoutAll(userId) { await Session.deleteMany({ userId }); }
