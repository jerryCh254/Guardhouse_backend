const mongoose = require('mongoose');

const customerPortalSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required: true
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    staticSites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sites"
    }],
    patrolSites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sites"
    }],
    deafultReport:{
        type:String,
    },
    frequency:{
        type:String,
    },
    specificIncidentReport:[{
       specificReport:{
        type:String,
       },
}],

})
module.exports = mongoose.model("CustomerPortal",customerPortalSchema)
