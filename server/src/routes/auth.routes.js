import { Router } from "express";
import { signup, login, logout, logoutAll, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { registrationAllowed } from "../middlewares/registration.middleware.js";
import { signupErrors, loginErrors } from "../validators/auth.validator.js";

const router = Router();
const validation = (errors, res, next) => Object.keys(errors).length
  ? res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Please correct the submitted fields.", fields: errors } })
  : next();

router.post("/signup", registrationAllowed, (req, res, next) => validation(signupErrors(req.body), res, next), signup);
router.post("/login", (req, res, next) => validation(loginErrors(req.body), res, next), login);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logout);
router.post("/logout-all", requireAuth, logoutAll);
export default router;
