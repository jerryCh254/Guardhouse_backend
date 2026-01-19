const User = require('../Models/auth.Model.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {JWT}= require('../config/env.js');
const crypto = require("crypto")
const transport = require('../config/email.js');

//Sign up
exports.signup = async (req,res)=>{
    try {
        const { name,email, password,role } = req.body;
        if (!name||!email || !password||!role) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashPassword
        });
    
        return res.status(201).json({
            message: "User created successfully",
            id: newUser._id,
            email: newUser.email,
            password:hashPassword,
            role:role,
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", err });
    }
};
//Log in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Email aur password is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ",
      token,
      id: user._id,
      email: user.email,
      name: user.name,
      password:user.password
  
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};
//forget password
exports.forgetPassword = async(req,res)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({message:"Email not found",err});
    }
    const resetToken = await crypto.randomBytes(40).toString('hex');
    user.resetToken = resetToken;
    user.ResetTokenExpire = Date.now()+10*60*1000;
    await user.save();

    const ResetLink = `${process.env.FRONTURL}/resetpassword/token=${resetToken}`;
    const message = `Click here to reset password ${ResetLink}`;

    await transport.sendMail({
      from:process.env.EMAIL_USER,
      to:user.email,
      subject:'Reset Password Link',
      text:message
    })
    return res.status(200).json({message:"Email is sent sucessfully"});
  }
  catch (err) {
    console.error("Actual error:", err);  
    return res.status(500).json({ message: "Server errors", error: err.message || err });
}

}
//resetpassword 
exports.resetPassword = async(req,res)=>{
  try{
    const {token,password}= req.body;
    if(!token||!password){
      return res.status(400).json({message:"Password and token is required is not given"})
    }
    const user = await User.findOne({resetToken:token,ResetTokenExpire:{$gt:Date.now()}});
    if(!user){
      res.status(400).json({message:"Token is expired"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

   
    user.resetToken = undefined;
    user.ResetTokenExpire = undefined;
     await user.save();
     const Updateuser = await User.findById(user._id).select("-password")
     res.status(200).json({
      message:"Password has change Sucessfully",
      newUser:Updateuser
     })
  }
 catch (err) {
    console.error("Actual error:", err);  
    return res.status(500).json({ message: "Server errors", error: err.message || err });
}
}
//Log out
exports.logout = async(req,res)=>{
  try{   
    return res.status(200).json({message:"Logout sucessfully"});

  }catch(err){
   console.error("Actual error:", err);  
    return res.status(500).json({ message: "Server errors", error: err.message || err });
  }
}
//user lists
exports.Getusers = async(req,res)=>{
try{
const users = await User.find();
return res.status(200).json({message:'Users are all fetched',users})
}
catch(err){
  return res.status(500).json({message:"server error"})
}
}