import "dotenv/config";
import { connectDatabase } from "../config/database.js";
import { User } from "../models/User.model.js";
import { hashPassword } from "../utils/password.js";

const email = (process.env.SUPER_ADMIN_EMAIL || "superadmin@mernskills.local").toLowerCase().trim();
const password = process.env.SUPER_ADMIN_PASSWORD || "ChangeMe@12345";
const name = process.env.SUPER_ADMIN_NAME || "MERN Skills Super Admin";

await connectDatabase();

const existing = await User.findOne({ email }).select("+passwordHash");
if (existing) {
  existing.role = "SUPER_ADMIN";
  existing.isActive = true;
  if (process.env.RESET_SUPER_ADMIN_PASSWORD === "true") existing.passwordHash = await hashPassword(password);
  await existing.save();
  console.log(`Super Admin already existed: ${email}`);
} else {
  await User.create({ name, email, passwordHash: await hashPassword(password), role: "SUPER_ADMIN", isActive: true });
  console.log(`Super Admin created: ${email}`);
}
console.log("Use the configured password, then change it before any real deployment.");
process.exit(0);
