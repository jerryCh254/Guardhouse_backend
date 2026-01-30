const Joi = require('joi');

const siteDetailsSchema = Joi.object({
  siteName: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  country: Joi.string().optional(),
  siteReferenceNumber1: Joi.string().optional(),
  siteReferenceNumber2: Joi.string().optional(),
  patrolSiteApiRef: Joi.string().optional(),
  latitude: Joi.string().optional(),
  longitude: Joi.string().optional(),
}).optional();

const portalScheduleItemSchema = Joi.object({
  day: Joi.string().valid('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN').optional(),
  timeFrom: Joi.string().optional(),
  timeTo: Joi.string().optional(),
  visits: Joi.number().optional(),
});

const contactItemSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().optional(),
});

const alarmContactsSchema = Joi.object({
  alarmCompany: Joi.array().items(contactItemSchema).optional(),
  monitoringCompany: Joi.array().items(contactItemSchema).optional(),
  calloutContact: Joi.array().items(contactItemSchema).optional(),
}).optional();

const siteDocumentSchema = Joi.object({
  documentName: Joi.string().optional(),
  filePath: Joi.string().optional(),
  reqSignature: Joi.boolean().optional(),
  renewalPeriod: Joi.string().optional(),
  allowAllStaffToView: Joi.boolean().optional(),
});

const checkpointSchema = Joi.object({
  name: Joi.string().optional(),
  qrNfc: Joi.string().optional(),
  geofence: Joi.string().optional(),
  distanceThreshold: Joi.string().optional(),
  codeSerialId: Joi.string().optional(),
});

const incidentReportItemSchema = Joi.object({
  name: Joi.string().optional(),
  enable: Joi.boolean().optional(),
});

const createPatrolSiteSchema = Joi.object({
  customerId: Joi.string().required(),
  regionId: Joi.string().required(),
  name: Joi.string().required(),
  siteDetails: siteDetailsSchema,
  portalSchedule: Joi.array().items(portalScheduleItemSchema).optional(),
  alarmContacts: alarmContactsSchema,
  siteDocuments: Joi.array().items(siteDocumentSchema).optional(),
  siteCodesAndInstructions: Joi.string().optional(),
  locationCheckpoints: Joi.array().items(checkpointSchema).optional(),
  incidentReportConfig: Joi.array().items(incidentReportItemSchema).optional(),
  status: Joi.string().valid('Active', 'Deactive').optional(),
});

const updatePatrolSiteSchema = Joi.object({
  customerId: Joi.string().optional(),
  regionId: Joi.string().optional(),
  name: Joi.string().optional(),
  siteDetails: siteDetailsSchema,
  portalSchedule: Joi.array().items(portalScheduleItemSchema).optional(),
  alarmContacts: alarmContactsSchema,
  siteDocuments: Joi.array().items(siteDocumentSchema).optional(),
  siteCodesAndInstructions: Joi.string().optional(),
  locationCheckpoints: Joi.array().items(checkpointSchema).optional(),
  incidentReportConfig: Joi.array().items(incidentReportItemSchema).optional(),
  status: Joi.string().valid('Active', 'Deactive').optional(),
}).min(1);

module.exports = {
  createPatrolSiteSchema,
  updatePatrolSiteSchema,
};
