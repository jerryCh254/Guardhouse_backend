const mongoose = require('mongoose');

const customerDocumentSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    documentName:{
        type:String,
        required:true
    },
    documentType:{
        type:String,
        required:true
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
    note:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model("customerDocument",customerDocumentSchema);