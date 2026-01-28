const mongoose = require('mongoose');

const User = new mongoose.Schema({
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        default:null
    },
    role:{
        type:String,
        enum:["SUPER_ADMIN","ADMIN","MANAGER","STAFF"]
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    resetToken:{
        type:String,
    },
    ResetTokenExpire:{
        type:String,
    },
    ResetLink:{
        type:String,
    },
    message:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    
},
{timestamps:true,});
module.exports = mongoose.model('User',User);