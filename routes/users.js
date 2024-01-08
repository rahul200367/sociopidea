const express  = require('express');
const router = express.Router();
const verifytoken = require('../Middilware/auth');
const User = require('../models/users');
 router.get('/:id',verifytoken, async(req, res)=>{
    try{
 const {id} = req.params;
 console.log(id);
  const user  = await User.findById(id);
  res.json(user);
    }
    catch(err){
        res.json({error:err.message});
    }
});
 router.get('/:id/friends',verifytoken, async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((User.findById(id)))
        )
        const formulatedfriends = friends.map(({_id,firstName, lastName,occupation,location,picturePath})=>{
            return {_id,firstName, lastName,occupation,location,picturePath}
        })
        res.json(formulatedfriends);

    }
    catch(err){
        res.json({error:err.message});
    }
 });
 router.patch('/:id/:friendId',verifytoken,async(req,res)=>{
    try{
 const {id} = req.params;
 const {friendId} = req.params;
 const user = await User.findById(id);
 const friend = await User.findById(friendId);
 if(user.friends.includes(friendId)){
    user.friends = user.friends.filter((id)=>id !== friendId);
    friend.friends = friend.friends.filter((id)=>id !== id);
 }
 else{
    user.friends.push(friendId);
    friend.friends.push(id);
 }
 await user.save();
 await friend.save();
 const friends = await Promise.all(
    user.friends.map((User.findById(id)))
)
const formulatedfriends = friends.map(({_id,firstName, lastName,occupation,location,picturePath})=>{
    return {_id,firstName, lastName,occupation,location,picturePath}
})
res.json(formulatedfriends);
    }
    catch(err){
        res.json({error:err.message});
    }

 });
 module.exports = router;