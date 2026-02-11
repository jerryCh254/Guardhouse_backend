const mongoose = require('mongoose');

const employeeSiteSchema = new mongoose.Schema({
    sites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sites"
        }],
     employeeId:{
             type: mongoose.Schema.Types.ObjectId, 
             ref:"Employee"
        },
    isPreferred:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:String,
    }
})
module.exports = mongoose.model('EmployeeSite',employeeSiteSchema);