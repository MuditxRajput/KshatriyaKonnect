import express from 'express';
import { auth_middleware } from '../middleware/auth.middleware.js';
import { Profile } from '../database/profile.model.js';
import mongoose from 'mongoose';
import { Iterate } from '../database/iterate.js';

const userrouter = express.Router();

userrouter.get('/all', auth_middleware, async (req, res) => {
  try {
    const userId = req.query.userid;
    let users;
    const id = req.user._id;;
    console.log(id);
    
    if (userId) {
      users = await Profile.find({
        $and: [
          { _id: { $gt: new mongoose.Types.ObjectId(userId) } },
          { user_id: { $ne:  new mongoose.Types.ObjectId(req.user._id)  } }
        ]
      })
      .limit(2)
      .select('-password -__v -createdAt -updatedAt');
    } else {
      users = await Profile.find({ _id: { $ne: req.user._id } })
        .limit(2)
        .select('-password -__v -createdAt -updatedAt');
    }

    if (users.length === 0) throw new Error('No users found');
    const excludeUser = await Iterate.findOne({user_id:id});
    console.log("->>>>>",excludeUser);
    
    let excludeIds;
    if(excludeUser)
    {
      console.log("Hello");
      
      excludeIds = excludeUser.iterate;
      console.log(excludeIds);
      
      const finalUser = users?.filter((val)=>!excludeIds?.includes(val.user_id));
      return res.status(200).json({ success: true, allUsers: finalUser });

    }
    
    return res.status(200).json({ success: true, allUsers: users });
    
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

export default userrouter;
