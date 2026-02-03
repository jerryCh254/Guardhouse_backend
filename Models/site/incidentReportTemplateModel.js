const mongoose = require('mongoose');

const incidentReportTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isGlobal: {
        type: Boolean,
        default: true
    },
    sites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sites"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('IncidentReportTemplate', incidentReportTemplateSchema);
