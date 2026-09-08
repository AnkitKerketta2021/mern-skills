import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { patchAvatar } from "../controllers/profile.controller.js";

const router = Router();
router.patch("/avatar", requireAuth, patchAvatar);
export default router;
