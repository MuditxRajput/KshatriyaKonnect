import express from 'express';
import { signupvalidation } from '../utils/zod-validation.js';
import { User } from '../database/user.model.js';
import bcrypt from "bcrypt";
const authRouter = express.Router();

authRouter.post('/signup',async(req,res)=>{
   try {
      const parsedData  = signupvalidation.parse(req.body);
      const{email,password,firstname,lastname,authProvider} = parsedData;
      const existedUser = await User.findOne({email});
      if(existedUser) throw new Error("User existed");
      // hased password
      const hashedPassword = await bcrypt.hash(password,10);
      const user = new User({
         email,
         password : hashedPassword,
         firstname,
         lastname, 
         authProvider
      });
      await user.save();
      return res.json({ success: true, msg: "Sign up successfully" });

   } catch (error) {
   
      return res.json({success:false, msg: error.message});

   }
  
})

export default authRouter;