import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { SERVER_CONFIG } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: SERVER_CONFIG.clientUrl, credentials: true }));
app.use(express.json({ limit: "4mb" }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({ success: true, name: "MERN SKILLS API", version: "phase-4" }));
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((req, res) => res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API route not found." } }));
app.use(errorHandler);

export default app;
