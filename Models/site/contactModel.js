const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
       site: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sites"
    }],
    contact:[{
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        emailAddress:{
            type:String,
        },
        mobileNumber:{
            type:String,
        },
        contactType:{
            type:String,
            enum:["Customer","Emergency","Incident","Advise Roster","Porfilo Manager","Others"],
        },
        notes:{
            type:String,
        }
}]
})
module.exports = mongoose.model("Contact",contactSchema)