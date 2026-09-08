import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key: { type: String, unique: true, default: "global" },
  maintenanceMode: { type: Boolean, default: false },
  allowRegistration: { type: Boolean, default: true },
  announcement: { type: String, maxlength: 500, default: "" },
  defaultTheme: { type: String, enum: ["dark", "light", "fire", "ice"], default: "dark" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export const AppSettings = mongoose.model("AppSettings", schema);
