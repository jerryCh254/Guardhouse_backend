const mongoose = require('mongoose');
const employeeSecurityLicense = new mongoose.Schema({
    licenseType:{
        type:String,
    },
   licenseNumber:{
        type:String,
    },
    attachFile:[{
        fileName:{
            type:String,
        },
        fileUrl:{
            type:String,
        },
        uploadedAt:{
            type:Date,
            default:Date.now
        }
    }],
    expireDate:{
        type:String,
    },
    reminder:{
        type:String,
    },
    critical:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    employeeId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Employee"
    },
})
module.exports = mongoose.model('employeeSecurityLicense', employeeSecurityLicense);