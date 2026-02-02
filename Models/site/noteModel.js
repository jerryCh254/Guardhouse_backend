const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    shortNote:{
        type:String,
    },
    note:{
        type:String,
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site"
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
    createdAt:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model('Notes', noteSchema);