const mongoose = require('mongoose');

const customerDocumentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    documentName: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        required: true
    },
    attachFile: [{
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
    }],
    note: {
        type: String,
    },
    // Additional fields from the UI
    allowStaffToView: {
        type: Boolean,
        default: false
    },
    requiresAcknowledgement: {
        type: Boolean,
        default: false
    },
    requiresSignature: {
        type: Boolean,
        default: false
    },
    requiresRenewal: {
        type: Boolean,
        default: false
    },
    renewalPeriod: {
        type: String,
        enum: ['1 month', '3 months', '6 months', '1 year', '2 years', '3 years', '5 years'],
        default: '1 year'
    },
    renewalDate: {
        type: Date
    },
    lastRenewedAt: {
        type: Date
    },
    acknowledgementRequired: {
        type: Boolean,
        default: false
    },
    acknowledgementDeadline: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("enhancedCustomerDocument", customerDocumentSchema);
