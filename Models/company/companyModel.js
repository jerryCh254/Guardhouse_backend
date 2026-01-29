const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    password:{
        type:String,
    },
    companyName:{
        type:String,
    },
    companyEmail:{
        type:String,
    },
    ContactInfo:{
        type:String,
    },
    address:{
        type:String,
    },
    registrationNumber:{
        type:String,
    },
    status:{
        type:String,
        enum:["PENDING","ACTIVE","REJECTED"],
        default:"PENDING"
    },
    plan:{
        type:String,
        enum:["BASIC","STANDARD","ENTERPRISE"],
    },
    passwordResetRequest:{
        type:String,
    },
    passwordResetToken:{
        type:String,
    },
    passwordResetTokenExpire:{
        type:String,
    },
    createdAt:{
        type:String,
    },
    },
{timestamps:true},);
module.exports = mongoose.model("Company",companySchema)
