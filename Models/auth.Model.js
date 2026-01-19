const mongoose = require('mongoose');

const User = new mongoose.Schema({
    role:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    resetToken:{
        type:String,
    },
    ResetTokenExpire:{
        type:String,
    },
    ResetLink:{
        type:String,
    },
    message:{
        type:String,
    }
});
module.exports = mongoose.model('User',User);