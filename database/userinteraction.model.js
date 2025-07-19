import mongoose from "mongoose";
import { Schema } from "mongoose";
const userinteractionSchema = new Schema({
    fromUserId : {
       type : mongoose.Types.ObjectId,
       ref : 'User',
       required: true,
    },
    toUserId :{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    action :{
        type : String,
        enum : ['like','pass']
    },

},{timestamps:true});
export const Userinteraction  = mongoose.model('Userinteraction',userinteractionSchema);