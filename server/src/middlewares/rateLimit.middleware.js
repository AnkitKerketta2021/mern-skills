export function rateLimit({windowMs,max}){
 const hits=new Map();
 return (req,res,next)=>{
  const now=Date.now();const key=req.ip||"unknown";const item=hits.get(key);
  if(!item||now-item.start>windowMs){hits.set(key,{start:now,count:1});return next();}
  item.count++;
  if(item.count>max)return res.status(429).json({success:false,error:{code:"RATE_LIMITED",message:"Too many requests. Try again later."}});
  next();
 };
}
