const mongoose = require('mongoose');
const complianceSchema = new mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    complianceName:{
        type:String,
        required: true
    },
    complianceType:{
        type:String,
        enum: ['Security License', 'Renewal', 'Certificate'],
        default: 'Security License'
    },
    licenseRef:{
        type:String,
    },
    expiryDate:{
        type:Date,
    },
    reminder:{
        type:String,
    },
    critical:{
        type:Boolean,
        default: false
    },
    attachmentPath:{
        type:String,
    },
    status:{
        type:String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending'
    },
    approved:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Compliance', complianceSchema);
