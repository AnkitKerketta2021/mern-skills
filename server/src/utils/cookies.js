import { SERVER_CONFIG } from "../config/env.js";
const base={httpOnly:true,secure:SERVER_CONFIG.nodeEnv==="production",sameSite:"lax",path:"/"};
export function setSessionCookie(res,token){res.cookie(SERVER_CONFIG.cookieName,token,{...base,maxAge:SERVER_CONFIG.sessionTtlMinutes*60*1000});}
export function clearSessionCookie(res){res.clearCookie(SERVER_CONFIG.cookieName,base);}
