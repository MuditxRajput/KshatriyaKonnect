import mongoose from "mongoose";
import { Schema } from "mongoose";
const matchSchema = new Schema({
    users :{
        type :[mongoose.Types.ObjectId].sort(),
        ref : 'User',
        required : true,
        validate :{
            validator : function(arr)
            {
                return arr.length===2;
            },
            message : 'A match must have exactly two users',
        },
        unmateched:{
            type:Boolean,
            default : false,
        }
        
    }
},{timestamps:true})

export const Match = mongoose.model('Match',matchSchema)