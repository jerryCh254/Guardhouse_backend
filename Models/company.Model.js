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
        enum:["PENDING","ACTIVE","SUSPENDED"],
        default:"PENDING"
    },
    plan:{
        type:String,
        enum:["BASIC","STANDARD","ENTERPRISE"],
    },
    createdAt:{
        type:String,
    },
    },
{timestamps:true},);
module.exports = mongoose.model("Company",companySchema)