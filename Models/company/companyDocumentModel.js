const mongoose = require('mongoose');

const companyDocumentSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  fileName: { type: String },
  mimeType: { type: String },
  allowAllStaffToView: { type: Boolean, default: false },
  requiresAcknowledgementBeforeShift: { type: Boolean, default: false },
  expireOnOrBefore: { type: Date },
  expirePeriod: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('CompanyDocument', companyDocumentSchema);
