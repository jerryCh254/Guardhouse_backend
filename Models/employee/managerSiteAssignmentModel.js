const mongoose = require('mongoose');

const managerSiteAssignmentSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    siteIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sites' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ManagerSiteAssignment', managerSiteAssignmentSchema);
