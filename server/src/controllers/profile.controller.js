import { updateAvatar } from "../services/profile.service.js";

import { hashPassword, verifyPassword } from "../utils/password.js";

import { User } from "../models/User.model.js";

export async function patchAvatar(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required.",
        },
      });
    }

    const user = await updateAvatar(userId, req.body.avatarData ?? null);

    return res.json({
      success: true,
      data: { user },
      message: "Profile avatar updated.",
    });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // --------------------------------
    // Validate required fields
    // --------------------------------

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "All password fields are required.",
        },
      });
    }

    // --------------------------------
    // Confirm new password
    // --------------------------------

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: "PASSWORD_MISMATCH",
          message: "New passwords do not match.",
        },
      });
    }

    // --------------------------------
    // Password rules
    // --------------------------------

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Password must contain at least 8 characters.",
        },
      });
    }

    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Password must contain at least one uppercase letter.",
        },
      });
    }

    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Password must contain at least one lowercase letter.",
        },
      });
    }

    if (!/[0-9]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Password must contain at least one number.",
        },
      });
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Password must contain at least one special character.",
        },
      });
    }

    // --------------------------------
    // Get authenticated user
    // --------------------------------

    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required.",
        },
      });
    }

    const user = await User.findById(userId).select("+passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User account was not found.",
        },
      });
    }

    // --------------------------------
    // Verify current password
    // --------------------------------

    const passwordMatches = await verifyPassword(
      currentPassword,
      user.passwordHash,
    );

    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_CURRENT_PASSWORD",
          message: "Current password is incorrect.",
        },
      });
    }

    // --------------------------------
    // Prevent password reuse
    // --------------------------------

    const samePassword = await verifyPassword(newPassword, user.passwordHash);

    if (samePassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: "PASSWORD_REUSED",
          message: "New password must be different from your current password.",
        },
      });
    }

    // --------------------------------
    // Hash new password
    // --------------------------------

    const newPasswordHash = await hashPassword(newPassword);

    user.passwordHash = newPasswordHash;

    await user.save();

    // --------------------------------
    // Success
    // --------------------------------

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
}
