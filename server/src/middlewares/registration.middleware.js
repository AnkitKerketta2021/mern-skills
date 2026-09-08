import { AppSettings } from "../models/AppSettings.model.js";

export async function registrationAllowed(req, res, next) {
  try {
    const settings = await AppSettings.findOne({ key: "global" }).lean();
    if (settings?.allowRegistration === false) {
      return res.status(403).json({ success: false, error: { code: "REGISTRATION_DISABLED", message: "New registration is currently disabled." } });
    }
    next();
  } catch (error) { next(error); }
}
