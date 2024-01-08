const mongoose = require('mongoose');
const Userpost = mongoose.Schema({
    userId:{
 type:String,
 required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    location:String,
    Description:String,
    picturePath:String,
    userpicturePath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true});
const post = mongoose.model('post',Userpost);
module.exports=post;