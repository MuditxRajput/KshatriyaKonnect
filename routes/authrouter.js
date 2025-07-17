import express from 'express';
import { loginvalidation, signupvalidation } from '../utils/zod-validation.js';
import { User } from '../database/user.model.js';
import bcrypt from "bcrypt";
import { parse } from 'dotenv';
import { generatejwt } from '../utils/generate-jwt.js';
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
authRouter.post('/login',async(req,res)=>{
   try {
      const parsedData = loginvalidation.parse(req.body);
      const{email,password} = parsedData;
      const existedUser = await User.findOne({email});
      if(!existedUser) throw new Error('User is not found');
      //checking password
      const isPasswordcorrect =  await bcrypt.compare(password,existedUser.password);
      
      
      if(!isPasswordcorrect) throw new Error('Invalid Credentials');
      // generate token.
      const token = generatejwt(existedUser._id,existedUser.email);
      if(!token.success) throw new Error(token.error);

      // wrap the json token inside the cookie and send inthe response..
      res.cookie("token",token.token,{
         httpOnly : true,
         maxAge: 30 * 24 * 60 * 60 * 1000,
      }).status(200)
      .json({success : true,msg :'user login successfully'})
   } catch (error) {
      res.status(400).json({msg:error.message});
   }

})

export default authRouter;