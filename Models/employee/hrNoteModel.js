const mongoose = require('mongoose');

const hrNoteSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HrNote', hrNoteSchema);
