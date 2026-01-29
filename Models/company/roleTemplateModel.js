const mongoose = require('mongoose');

const roleTemplateSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  securityLicenceRequirements: { type: String },
  critical: { type: Boolean, default: false },
  showToCustomer: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('RoleTemplate', roleTemplateSchema);
