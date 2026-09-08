import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 500, default: "" },
  status: { type: String, enum: ["ACTIVE", "DRAFT", "ARCHIVED"], default: "ACTIVE" },
  visibility: { type: String, enum: ["PRIVATE", "TEAM", "PUBLIC"], default: "PRIVATE" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Dashboard = mongoose.model("Dashboard", schema);
