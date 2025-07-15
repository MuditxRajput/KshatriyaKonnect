import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
    },
    firstname:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required:true,
    },
    authprovider:{
        type:String,
        enum : ["local","google"],
        default : "local",
        required:true,
    }
},{timestamps:true})
userSchema.pre("save",function(next){
    if(this.authprovider==="local" && !this.password)
    {
        return next(new Error("Password is required for local authentication"));
    }
    next();
})
export const User = mongoose.model("User",userSchema);