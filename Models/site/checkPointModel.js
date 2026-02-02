const mongoose = require('mongoose');

const checkPointSchema = new mongoose.Schema({
    checkPointName:{
        type:String,
    },
    code:{
        type:String,
    },
    code:{
        type:String,
    },
    type:{
        type:String,
        enum:["qrCode","NFC"],
    },
    createdAt:{
        type:String,
    }
})
module.exports = mongoose.model("checkPoint",checkPointSchema);