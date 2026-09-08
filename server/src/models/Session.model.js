import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},
  tokenHash:{type:String,required:true,unique:true,select:false},
  expiresAt:{type:Date,required:true,index:true},
  absoluteExpiresAt:{type:Date,required:true,index:true}
},{timestamps:true});
schema.index({expiresAt:1},{expireAfterSeconds:0});
schema.index({absoluteExpiresAt:1},{expireAfterSeconds:0});
export const Session = mongoose.model("Session",schema);
