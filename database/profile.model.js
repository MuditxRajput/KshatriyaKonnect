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
    height:{
        type:String,
    },
    location:{
        type:
        {
            type : String,
            enum:['Point'],            
        },
        coordinates:{
            type:[Number],
           
        }
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref : 'User',
        require : true,
    }
},{timestamps:true})
profileSchema.index({location:'2dsphere'});
export const Profile = mongoose.model("profile",profileSchema);