const mongoose = require('mongoose');

const submittedComplianceSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    complianceName: { type: String, required: true },
    complianceType: { type: String, enum: ['Security License', 'Renewal'], default: 'Security License' },
    licenseRef: String,
    expiryDate: Date,
    attachmentPath: String,
    approved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubmittedCompliance', submittedComplianceSchema);
