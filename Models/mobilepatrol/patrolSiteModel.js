const mongoose = require('mongoose');

const patrolSiteSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
    name: { type: String, required: true },
    siteDetails: {
      siteName: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      siteReferenceNumber1: String,
      siteReferenceNumber2: String,
      patrolSiteApiRef: String,
      latitude: String,
      longitude: String,
    },
    portalSchedule: [
      {
        day: { type: String, enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] },
        timeFrom: String,
        timeTo: String,
        visits: { type: Number, default: 1 },
      },
    ],
    alarmContacts: {
      alarmCompany: [{ name: String, phone: String, email: String }],
      monitoringCompany: [{ name: String, phone: String, email: String }],
      calloutContact: [{ name: String, phone: String, email: String }],
    },
    siteDocuments: [
      {
        documentName: String,
        filePath: String,
        reqSignature: { type: Boolean, default: false },
        renewalPeriod: String,
        allowAllStaffToView: { type: Boolean, default: false },
      },
    ],
    siteCodesAndInstructions: { type: String, default: '' },
    locationCheckpoints: [
      {
        name: String,
        qrNfc: String,
        geofence: String,
        distanceThreshold: String,
        codeSerialId: String,
      },
    ],
    incidentReportConfig: [
      {
        name: String,
        enable: { type: Boolean, default: true },
      },
    ],
    status: { type: String, enum: ['Active', 'Deactive'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PatrolSite', patrolSiteSchema);
