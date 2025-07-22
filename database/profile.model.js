import mongoose from "mongoose";
import { Schema } from "mongoose";
const profileSchema = mongoose.Schema({
    firstname : {
        type : String,
        trim : true,
        required : true,
    },
    lastname:{
        type:String,
        trim : true,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    interestedIn:{
        type:String,
        enum:['male','female','both'],
    },
    photo:[
        {
            public_id:{
                type:String,
            },
            url :{
                type:String,
            }
        }
    ],
    education:{
        type:String,
        enum : ['12th','graduate','master','job'],
    },
    gender:{
        type:String,
        enum : ['male','female'],
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    bio:{
        type:String,
        default : 'null'
    },
    place_of_Origin:{
         type: String,
         required: true,
    },
    gotra:{
        type:String,
    },
    looking_for:{
        type: String,
        enum : ['Serious Relationship','Friendship','Casual Dating','Marriage'],
        required : true,
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref : 'User',
        require : true,
    }
},{timestamps:true})
export const Profile = mongoose.model("profile",profileSchema);