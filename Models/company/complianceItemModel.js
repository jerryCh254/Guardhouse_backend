const mongoose = require('mongoose');

const renewalSchema = new mongoose.Schema({
  renewedAt: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  notes: { type: String },
}, { _id: true });

const complianceItemSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  description: { type: String },
  reminder: { type: String },
  critical: { type: Boolean, default: false },
  showToCustomer: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  renewals: [renewalSchema],
}, { timestamps: true });

module.exports = mongoose.model('ComplianceItem', complianceItemSchema);
