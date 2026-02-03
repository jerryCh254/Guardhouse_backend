const mongoose = require('mongoose');
const roleTemplateSchema = new mongoose.Schema({
    name: { type: String },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sites"
    },
});
module.exports = mongoose.model("siteRoleTemplate",roleTemplateSchema);