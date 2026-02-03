const mongoose = require('mongoose');

const siteDocumentSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  documentName: { type: String, required: true },
   attachFile:[{
        fileName:{
            type:String,
        },
        fileUrl:{
            type:String,
        },
        uploadedAt:{
            type:Date,
            default:Date.now
        }
    }],
  mimeType: { type: String },
  allowAllStaffToView: { type: Boolean, default: false },
  requiresAcknowledgementBeforeShift: { type: Boolean, default: false },
  requireSignature:{type: Boolean, default: false},
  needRenenwal:{type: Boolean, default: false},
  renenwalPeriodMonth:{type: String},
}, { timestamps: true });

module.exports = mongoose.model('SiteDocument', siteDocumentSchema);
