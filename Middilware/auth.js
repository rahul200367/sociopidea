

const jwt = require('jsonwebtoken');
 const verifytoken = async (req,res,next) =>{
try{
let token = req.header('Authorization');
if(!token) res.status(400).json({msg:'Accessdenied'});
if(token.startsWith('Bearer')){
    token = token.slice(7,token.length).trimLeft();
}
const verify = jwt.verify(token, process.env.JSWT_SIGN);
req.user = verify;
next();
}
catch(err){
    res.json({error: err.message});
}
 }
 module.exports = verifytoken;