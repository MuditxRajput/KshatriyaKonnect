import mongoose from "mongoose";
import { Schema } from "mongoose";
const iterateSchema = new Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    iterate : {
        type : [mongoose.Types.ObjectId]
    }
},{timestamps:true});

export const Iterate =  mongoose.model('Iterate',iterateSchema);