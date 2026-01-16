const User = require('../Models/auth.Model.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {JWT}= require('../config/env.js');

exports.signup = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
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
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", err });
    }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email aur password is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ",
      token,
      User: {
        id: user._id,
        email: user.email,
        name: user.name,
        password:user.password
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error ", error: error.message });
  }
};