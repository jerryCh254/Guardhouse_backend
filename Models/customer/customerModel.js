const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName:{
        type:String,
    },
    customerReferenceNumber:{
        type:String,
    },
    ReferenceId:{
        type:String,
    },
    Address:{
        type:String
    },
    city:{
        type:String,
    },
    zipCode:{
        type:String
    },
    country:{
        type:String,
    },
    invoiceRemainder:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    Contact:[{
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        email:{
            type:String,
        },
        mobileNumber:{
            type:String,
        },
        position:{
            type:String,
        },
        note:{
            type:String,
        }
    }],
    createdAt:{
        type:String,
    },
    sites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sites"
    }],
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "enhancedCustomerDocument"
    }],
    eventDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventDetails"
    }
    
})
module.exports = mongoose.model("Customer",customerSchema)
