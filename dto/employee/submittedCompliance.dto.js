const Joi = require('joi');

const createSubmittedComplianceSchema = Joi.object({
  employeeId: Joi.string().required(),
  complianceName: Joi.string().required(),
  complianceType: Joi.string().valid('Security License', 'Renewal').optional(),
  licenseRef: Joi.string().optional(),
  expiryDate: Joi.date().optional(),
  attachmentPath: Joi.string().optional(),
});

const updateSubmittedComplianceSchema = Joi.object({
  approved: Joi.boolean().optional(),
  status: Joi.string().valid('Pending', 'Approved', 'Rejected', 'Cancelled').optional(),
}).min(1);

module.exports = { createSubmittedComplianceSchema, updateSubmittedComplianceSchema };
