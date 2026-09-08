import mongoose from "mongoose";
import { SERVER_CONFIG } from "./env.js";
export async function connectDatabase() {
  try { await mongoose.connect(SERVER_CONFIG.mongoUri); console.log("MongoDB connected"); }
  catch (error) { console.error("MongoDB connection failed:", error.message); process.exit(1); }
}
