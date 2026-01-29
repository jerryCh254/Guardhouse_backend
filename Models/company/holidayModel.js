const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, default: '00:00' },
  endTime: { type: String, default: '23:59' },
  country: { type: String },
  state: { type: String },
  year: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Holiday', holidaySchema);
