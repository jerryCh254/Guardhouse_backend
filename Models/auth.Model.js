const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    }

});
module.exports = mongoose.model('User',User);