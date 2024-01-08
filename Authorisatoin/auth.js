const express = require('express');
const verifytoken = require('../Middilware/auth');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const user = require('../models/users')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/assets')
    },  
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload = multer({storage})
router.post('/register',upload.single('picture'), async(req,res)=>{
try{
    const {firstName, lastName,email,password,picturePath,friends,location,occupation} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new user({
        firstName,
        lastName,
        email,
        password : passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random()*100),
        impressions:Math.floor(Math.random()*100),
    })
 const saveduser  = await newUser.save();
 res.json(saveduser);
}
catch(err){
res.status(500).json({error: err.massage});
}
});
router.post('/login',verifytoken ,async(req,res)=>{
  try{
    const {email, password} = req.body;
    const user = await user.findOne({email:email});
     if (!user)  res.status(400).json({msg:'user not find'});
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch) res.status(400).json({msg:'invalid credintial'});
     const token = jwt.sign({id:user._id}, process.env.JSWT_SIGN);
     delete user.password;
     res.json({token,user});
  }
  catch(err){
    res.json({error: err.massage});
  }

})
module.exports = router;