const express = require('express');
const verifytoken  = require('../Middilware/auth');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/users');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/assets')
    },  
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage});
router.post('/createpost',upload.single('picture'),async(req,res)=>{
    try{
const {userId , picturePath,Description} = req.body;
const user  = await User.findById(userId);
const newpost = await Post({
    userId,
    firstName:user.firstName,
    lastName:user.lastName,
    location:user.location,
    Description,
    userPicturePath: user.picturePath,
    picturePath,
    likes:{},
    comments:[]
});
await newpost.save();
const post = await Post.find();
res.json(post)
    }
    catch(err){
        res.json({error:err.message});
    }
})
router.get('/',verifytoken, async(req,res)=>{
    try{
  const post = await Post.find();
  res.json(post);
    }
    catch(err){
       res.json({error:err.message});
    }
})
router.get('/:userId/post',verifytoken,async(req,res)=>{
try{
const {userId} = req.params;
const post = await Post.find({userId});
if(!post) return res.status(400).json("No posts found");
res.json(post);
}
catch(err){
    res.json({error:err.message});
}
})
//update
router.patch('/:Id/like',verifytoken,async(req,res)=>{
try{
const {Id} = req.params;
const {userId} = req.body;
const post = await Post.findById(Id);
const isLiked = await post.get(userId);
if(isLiked){
    post.likes.pull(userId);
}
else{
    post.likes.set(userId, true);
}
const updatedPost = await Post.findbyIdAndUpdate(
    Id,
    {likes: post.likes},
    {new:true}
    );
    res.json(updatedPost)
}
catch(err){
    res.json({error:err.message});
}
})
module.exports = router;