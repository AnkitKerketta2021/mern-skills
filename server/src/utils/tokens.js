import { createHash,randomBytes } from "node:crypto";
export const createSessionToken=()=>randomBytes(48).toString("base64url");
export const hashToken=token=>createHash("sha256").update(token).digest("hex");
