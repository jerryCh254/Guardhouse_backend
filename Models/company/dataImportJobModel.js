const mongoose = require('mongoose');

const dataImportJobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  importType: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  filePath: { type: String },
  totalRows: { type: Number },
  processedRows: { type: Number, default: 0 },
  errorRows: { type: Number, default: 0 },
  errors: [{ row: Number, message: String }],
  completedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('DataImportJob', dataImportJobSchema);
