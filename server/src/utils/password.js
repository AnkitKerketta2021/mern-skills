import { randomBytes,scrypt as scryptCallback,timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
const scrypt=promisify(scryptCallback);
export async function hashPassword(password){const salt=randomBytes(16).toString("hex");const key=await scrypt(password,salt,64);return `${salt}:${Buffer.from(key).toString("hex")}`;}
export async function verifyPassword(password,stored){const [salt,key]=stored.split(":");if(!salt||!key)return false;const actual=Buffer.from(await scrypt(password,salt,64));const expected=Buffer.from(key,"hex");return actual.length===expected.length&&timingSafeEqual(actual,expected);}
