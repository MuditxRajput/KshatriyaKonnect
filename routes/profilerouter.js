import express from'express'
import { auth_middleware } from '../middleware/auth.middleware.js';
import { profileValidation } from '../utils/zod-validation.js';
import { Profile } from '../database/profile.model.js';
const profileRouter = express.Router();

profileRouter.post('/new',auth_middleware,async(req,res)=>{
  try {
    const parsed =  profileValidation.parse(req.body);
    if(!parsed) throw new Error('Invalid data');
    parsed["longitude"] = req.body.longitude;
    parsed["latitude"] = req.body.latitude;
    const{firstname,lastname,age,interestedIn,photo,education,gender,height,longitude,latitude} = parsed;
    // before created user profile we have to save the user profile in the s3 and get the link
    const profile = new Profile({
      firstname,
      lastname,
      age,
      interestedIn,
      photo,
      education,
      gender,
      height,
      latitude,
      longitude
    });
    await profile.save();
     
    if(!profile) throw new Error('sanjdnkj')
    return res.status(200).json({success:true,msg:'User profile is created'})
  } catch (error) {
     if(error.name==="ZodError")
     {
      return res.status(400).json({
        success:false,
        message : 'invalid_input'
      })
     }
     else{
      return res.status(400).json({
        success : false,
        message :error
      })
     }
    
  }
})

export default profileRouter;