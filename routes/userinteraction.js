import express from 'express'
import { auth_middleware } from '../middleware/auth.middleware';
import { Userinteraction } from '../database/userinteraction.model';
const userinteraction = express.Router();

userinteraction.post('/like/:touserId',auth_middleware,async(req,res)=>{
    try {
        const {toUserId} = req.params;
        const fromUserId = req.user._id;
        if(!toUserId ||!fromUserId ) throw new Error('something went wrong');
        const existedInteraction = await Userinteraction.findOne({toUserId:fromUserId,fromUserId:toUserId,action:'like'});
       await Userinteraction.findOneAndUpdate(
  { fromUserId, toUserId },
  { action: 'like' },
  { upsert: true, new: true }
);

       if(existedInteraction) return res.status(200).json({success:true,msg:`It's is match`});
        return res.status(200).json({success:true,msg:`${fromUserId} like ${toUserId}`})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });

        
    }
})
userinteraction.post('/pass/:touserId',auth_middleware,async(req,res)=>{
    try {
     const {toUserId} = req.params;
     const fromUserId = req.user._id;
    if(!toUserId ||!fromUserId ) throw new Error('something went wrong');
    const existedInteraction = await Userinteraction.findOne({fromUserId:toUserId,toUserId:fromUserId,action:'pass'});
    if(existedInteraction) return res.status(200).json({ message: 'Already passed' });
     await Userinteraction.findOneAndUpdate({
      fromUserId,
      toUserId,  
     },{action :'pass'},{upsert:true,new :true});
      return res.status(200).json({success:true,msg:'User pass'});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,msg:error.message});
    }
})
export default userinteraction;