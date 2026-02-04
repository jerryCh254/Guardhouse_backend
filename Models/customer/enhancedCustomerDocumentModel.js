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
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
customerDocumentSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    
    // Set renewal date if renewal is required
    if (this.requiresRenewal && this.renewalPeriod && !this.renewalDate) {
        const periodMap = {
            '1 month': 1,
            '3 months': 3,
            '6 months': 6,
            '1 year': 12,
            '2 years': 24,
            '3 years': 36,
            '5 years': 60
        };
        
        const months = periodMap[this.renewalPeriod] || 12;
        this.renewalDate = new Date();
        this.renewalDate.setMonth(this.renewalDate.getMonth() + months);
    }
    
    next();
});

module.exports = mongoose.model("enhancedCustomerDocument", customerDocumentSchema);
