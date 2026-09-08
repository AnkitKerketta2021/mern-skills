import express from "express";
import {
    changePassword,
    patchAvatar,

} from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch(
    "/avatar",
    requireAuth,
    patchAvatar
);

router.patch(
    "/password",
    requireAuth,
    changePassword
);

export default router;