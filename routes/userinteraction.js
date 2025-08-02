import express from 'express'
import { auth_middleware } from '../middleware/auth.middleware.js';
import { Userinteraction } from '../database/userinteraction.model.js';
import { Match } from '../database/match.model.js';
import { Iterate } from '../database/iterate.js';
const userinteraction = express.Router();

userinteraction.post('/like/:toUserId', auth_middleware, async (req, res) => {
    try {
        const { toUserId } = req.params;
        console.log("Inside like api with user id ", toUserId);
        
        const fromUserId = req.user._id;
        if (!toUserId || !fromUserId) throw new Error('something went wrong');
        const existedInteraction = await Userinteraction.findOne({ toUserId: fromUserId, fromUserId: toUserId, action: 'like' });
        await Userinteraction.findOneAndUpdate(
            { fromUserId, toUserId },
            { action: 'like' },
            { upsert: true, new: true }
        );
        const existedMatch = await Match.findOne({users : {$all:[toUserId,fromUserId]}});
        if(existedMatch) return res.status(200).json({success:true,msg:'Already Match'})
        if (existedInteraction) {
            // enter the data in the match schema...
            const match = new Match({
                users : [toUserId,fromUserId],
            });
            await match.save();
            return res.status(200).json({success:true,msg:`Yeaaaah It's a Match 💘`})
        }
       const iterateData = await Iterate.findOneAndUpdate(
        {user_id : fromUserId},
        {$push : {iterate : toUserId}},
        {new:true,upsert:true}
       );

        return res.status(200).json({ success: true, msg: `${fromUserId} like ${toUserId}` })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });


    }
})
userinteraction.post('/pass/:toUserId', auth_middleware, async (req, res) => {
    try {
        const { toUserId } = req.params;
        const fromUserId = req.user._id;
        if (!toUserId || !fromUserId) throw new Error('something went wrong');
        const existedInteraction = await Userinteraction.findOne({ fromUserId: toUserId, toUserId: fromUserId, action: 'pass' });
        if (existedInteraction) return res.status(200).json({ message: 'Already passed' });
        const existedMatch = await Match.findOne({users:{$all:[toUserId,fromUserId]}});
        if(existedMatch)
        {
            // remove that match from match table..
            await Match.deleteOne({_id:existedMatch._id});
        }
        await Userinteraction.findOneAndUpdate({
            fromUserId,
            toUserId,
        }, { action: 'pass' }, { upsert: true, new: true });
        const iterateData = await Iterate.findOneAndUpdate(
            {user_id:fromUserId},
            {$push:{iterate:toUserId}},
            {new:true,upsert:true}
        );
        console.log(iterateData);
        
        return res.status(200).json({ success: true, msg: 'User pass' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, msg: error.message });
    }
})
export default userinteraction;