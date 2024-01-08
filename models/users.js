const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true,    
        max:50
    },
    password:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    picturePath:{
       type:String,
       default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,
},{timestamps:true});
const user = mongoose.model('user',userSchema);
module.exports = user;