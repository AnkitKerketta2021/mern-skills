import { User } from "../models/User.model.js";

export function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    avatarData: user.avatarData || null,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  };
}

export async function updateAvatar(userId, avatarData) {
  if (avatarData !== null && (typeof avatarData !== "string" || avatarData.length > 3000000 || !avatarData.startsWith("data:image/"))) {
    const error = new Error("Invalid avatar image. Use an image below 2 MB.");
    error.status = 400;
    error.code = "INVALID_AVATAR";
    throw error;
  }
  const user = await User.findByIdAndUpdate(userId, { avatarData }, { new: true });
  return publicUser(user);
}
