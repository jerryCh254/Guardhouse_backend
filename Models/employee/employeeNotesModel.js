const mongoose =require('mongoose');
const employeeNotesSchema = new mongoose.Schema({
    note:{
        type:String,
    },
    createdAtL:{
        type:String,
    },
    employeeId:{
                 type: mongoose.Schema.Types.ObjectId, 
                 ref:"Employee"
    },
})
module.exports = mongoose.model('employeeNotes',employeeNotesSchema);