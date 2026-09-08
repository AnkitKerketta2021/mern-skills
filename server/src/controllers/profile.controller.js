import { updateAvatar } from "../services/profile.service.js";

export async function patchAvatar(req, res, next) {
  try {
    const user = await updateAvatar(req.user._id, req.body.avatarData ?? null);
    res.json({ success: true, data: { user }, message: "Profile avatar updated." });
  } catch (error) { next(error); }
}
