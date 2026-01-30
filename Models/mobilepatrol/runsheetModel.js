const mongoose = require('mongoose');

const runsheetSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
    name: { type: String, required: true },
    defaultRun: String,
    runsheetStart: String,
    runsheetEnd: String,
    days: [{ type: String, enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] }],
    patrolSites: [
      {
        patrolSiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatrolSite', required: true },
        days: [{ type: String, enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] }],
        timeFrom: String,
        timeTo: String,
        visitsCount: { type: Number, default: 1 },
        expectedTimeMinutes: { type: Number, default: 0 },
      },
    ],
    runsheetLength: String,
    totalExpectedTime: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Runsheet', runsheetSchema);
