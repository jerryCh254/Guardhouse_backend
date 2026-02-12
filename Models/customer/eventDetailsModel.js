const mongoose = require('mongoose');

const eventDetailsSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    leftHeaderLogo: {
        fileName: {
            type: String,
        },
        fileUrl: {
            type: String,
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    rightHeaderLogo: {
        fileName: {
            type: String,
        },
        fileUrl: {
            type: String,
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    abn: {
        type: String,
        required: true
    },
    businessContactNumber: {
        type: String,
        required: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    masterLicenses: [{
        state: {
            type: String,
            required: true,
            enum: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
        },
        licenseNumber: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("EventDetails", eventDetailsSchema);
