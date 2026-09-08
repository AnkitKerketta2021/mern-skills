import { Session } from "../models/Session.model.js";
import { User } from "../models/User.model.js";
import { SERVER_CONFIG } from "../config/env.js";
import { hashToken } from "../utils/tokens.js";

export async function requireAuth(req,res,next){
 try{
  const token=req.cookies[SERVER_CONFIG.cookieName];
  if(!token)return res.status(401).json({success:false,error:{code:"AUTH_REQUIRED",message:"Authentication required."}});
  const session=await Session.findOne({tokenHash:hashToken(token),expiresAt:{$gt:new Date()},absoluteExpiresAt:{$gt:new Date()}}).select("+tokenHash");
  if(!session)return res.status(401).json({success:false,error:{code:"SESSION_EXPIRED",message:"Session expired."}});
  const user=await User.findById(session.userId);
  if(!user||!user.isActive)return res.status(401).json({success:false,error:{code:"USER_INACTIVE",message:"Account is unavailable."}});
  req.user=user;req.session=session;next();
 }catch(error){next(error);}
}
export function requireRole(...roles){return (req,res,next)=>roles.includes(req.user?.role)?next():res.status(403).json({success:false,error:{code:"FORBIDDEN",message:"Insufficient permissions."}});}
