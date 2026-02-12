const mongoose = require('mongoose');

const leaveSettingSchema = new mongoose.Schema({
    leaveDaysPerYear:{
        type:String,
    },
    leaveResetDays:{
        type:String,
    },
    halfDay:{
        type:String,
    },
    fullDay:{
        type:String,
    },

    createdAt:{
        type:String,
    },
    employeeId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Employee"
},

}

)
module.exports = mongoose.model("EmployeeLeaveSetting",leaveSettingSchema);