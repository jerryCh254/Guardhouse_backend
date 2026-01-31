const mongoose = require('mongoose');

const preferredStaffSchema = new mongoose.Schema({
    employeeId:{
         type: mongoose.Schema.Types.ObjectId, 
         ref:"Employee"
    },
    customerId:{
         type: mongoose.Schema.Types.ObjectId, 
         ref:"Customer"
    },
    siteId:{
        type: mongoose.Schema.Types.ObjectId, 
         ref:"Site"
    },
    isPreferred:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("preferredStaff",preferredStaffSchema);