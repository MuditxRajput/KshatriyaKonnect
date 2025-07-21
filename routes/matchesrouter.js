import express from 'express';
import { auth_middleware } from '../middleware/auth.middleware.js';
import { Match } from '../database/match.model.js';
import { Profile } from '../database/profile.model.js';
const matchRouter = express.Router();
matchRouter.get('/all',auth_middleware,async(req,res)=>{
    try {
        const id = req.user._id; 
        const matches = await Match.find({users:id});
        const toUserIds = matches.map((data)=>data.users?.filter((userid)=>id.toString()!=userid.toString())).flat();
        const myMatch = await Profile.find({user_id : {$in : toUserIds}},'firstname photo');
        if(myMatch.length===0) return res.json({success:false,msg:'No Match'});
        return res.status(200).json({success:true,myMatch});    
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,error : error.message});
        
    }

})
export default matchRouter;