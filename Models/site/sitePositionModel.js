const mongoose = require('mongoose');

const sitePositionSchema = new mongoose.Schema({
    position:{
        type:String,
    },
    name:{
        type:String,
    },
 site: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Sites"
     },
});
module.exports = mongoose.model('siteSitePositions',sitePositionSchema);