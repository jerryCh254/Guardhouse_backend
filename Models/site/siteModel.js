const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    customer: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Customer"
}],
    siteName:{
        type:String,
    },
    id:{
        type:String,
    },
    siteReferenceNumber:{
        type:String,
    },
    referenceId:{
    type:String,
    },
    address:{
        type:String,
    },
    state:{
        type:String,
    },
    zipCode:{
        type:String,
    },
    country:{
        type:String,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String,
    },
    mobileNumber:{
        type:String,
    },
    welfarecheckInterval:{
        type:String,
    },
    holidayCalender:{
        type:String,
    },
    mobileClockTime:{
        type:String,
    },
    welfareChecks:[{
        day:{
            type:String,
            enum:["monday","tuesday","wednesday","thrusday","friday","saturday","sunday"],
        },
        startHours:{
            type:String,
        },
        toHours:{
            type:String,
        },
    }],
    createdAt:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },
      contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact"
    }
  ],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes"
  }],
sitePosition: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "siteSitePositions"
}],
incidentReportTemplates: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "IncidentReportTemplate"
}],
roleTemplates: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "siteRoleTemplate"
}]
})
module.exports = mongoose.model("Sites",siteSchema);
