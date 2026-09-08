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
    lastLoginAt: user.lastLoginAt,
  };
}

export async function updateAvatar(
  userId,
  avatarData,
) {
  if (
    avatarData !== null &&
    (
      typeof avatarData !== "string" ||
      avatarData.length > 3000000 ||
      !avatarData.startsWith("data:image/")
    )
  ) {
    const error = new Error(
      "Invalid avatar image. The processed avatar must be below 2 MB."
    );

    error.status = 400;
    error.code = "INVALID_AVATAR";

    throw error;
  }

  const user =
    await User.findByIdAndUpdate(
      userId,
      { avatarData },
      { new: true },
    );

  if (!user) {
    const error = new Error(
      "User account was not found.",
    );

    error.status = 404;
    error.code = "USER_NOT_FOUND";

    throw error;
  }

  return publicUser(user);
}