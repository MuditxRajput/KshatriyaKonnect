import express from 'express';
import { auth_middleware } from '../middleware/auth.middleware.js';
import { User } from '../database/user.model.js';
const userrouter = express.Router();
userrouter.get('/all',auth_middleware,async(req,res)=>{
  try {
   const allUsers = await User.find();
   if(allUsers.length==0) throw new Error('No user found');
   return res.status(200).json({success:true,allUsers});
  } catch (error) {
    console.log(error);
    return res.status(400).json({success:false,error});
  }
})
export default userrouter;