const mongoose = require('mongoose');

const employeeComplianceRequestSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    complianceItemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ComplianceItem' }],
    status: {
      type: String,
      enum: ['Requested', 'Approved', 'Rejected'],
      default: 'Requested',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmployeeComplianceRequest', employeeComplianceRequestSchema);
