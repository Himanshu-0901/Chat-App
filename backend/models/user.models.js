import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    profilePic:{
        type:String,
        default:""
    }
    // createdAt, updatedAt.
},{timestamps:true})

const user = mongoose.model("User",userSchema)
export default user;