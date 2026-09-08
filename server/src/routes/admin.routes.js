import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/admin.controller.js";

const router = Router();
router.use(requireAuth, requireRole("SUPER_ADMIN"));

router.get("/users", controller.users);
router.patch("/users/:id", controller.updateUser);

router.get("/dashboards", controller.dashboards);
router.post("/dashboards", controller.createDashboard);
router.patch("/dashboards/:id", controller.updateDashboard);
router.delete("/dashboards/:id", controller.deleteDashboard);

router.get("/settings", controller.settings);
router.patch("/settings", controller.updateSettings);

export default router;
