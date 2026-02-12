const mongoose = require('mongoose');

const employeeLeaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
        leaveDaysPerYear: {
        type: String,
    },
    leaveResetDays: {
        type: String,
    },
    halfDay: {
        type: String,
    },
    fullDay: {
        type: String,
    },
    
    leaveType: {
        type: String,
        enum: ['Fixed', 'Accrued', 'Rolled Up'],
        default: 'Fixed'
    },
    
    fixedBalance: {
        type: Number,
        default: 0
    },
    
    accruedBalanceHours: {
        type: Number,
        default: 0
    },
    avgPayRate: {
        type: Number,
        default: 0
    },
    avgShiftHours: {
        type: Number,
        default: 0
    },
    
    rolledUpBalance: {
        type: Number,
        default: 0
    },
    
    leaveRefreshDate: {
        type: Date
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    
    leaveHistory: [{
        adjustmentType: {
            type: String,
            enum: ['Balance Adjustment', 'Switched leave type', 'Leave Request', 'Leave Cancellation'],
            required: true
        },
        
        fromLeaveType: {
            type: String,
            enum: ['Fixed', 'Accrued', 'Rolled Up']
        },
        toLeaveType: {
            type: String,
            enum: ['Fixed', 'Accrued', 'Rolled Up']
        },
        
        unit: {
            type: String,
            enum: ['Days', 'Hours'],
            required: true
        },
        adjustment: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
        
        leavePeriod: {
            startDate: Date,
            endDate: Date
        },
        
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Update'],
            default: 'Pending'
        },
        submittedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        approvedDate: Date,
        
        notes: String,
        
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

employeeLeaveSchema.index({ employeeId: 1, isActive: 1 });
employeeLeaveSchema.index({ 'leaveHistory.createdAt': -1 });

module.exports = mongoose.model("EmployeeLeave", employeeLeaveSchema);
