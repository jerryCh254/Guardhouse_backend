const jwt = require('jsonwebtoken');
const {JWT} = require('../config/env')
exports.auth= (req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({message:"UnAuthorized access"})
    }
     if(!authHeader.startwith("Bearer")){
        return res.status(400).json({message:"Beaer is missing"})
    }
    const token = authHeader.split("")[1];
    if(!token){
        return res.status(400).json({message:"Token is missing"})
    }
    const decode = jwt.verfiy(token,JWT)
    req.user = decode;
    next();}
    catch(err){
        return res.status(400).json({message:"Invalid Tone or expired"})
    }

}