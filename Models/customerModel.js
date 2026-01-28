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
    City:{
        type:String,
    },
    zipCode:{
        type:String
    },
    
    


})