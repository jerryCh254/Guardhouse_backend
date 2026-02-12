const Joi = require('joi');

const createComplianceSchema = Joi.object({
  employeeId: Joi.string().required(),
  complianceName: Joi.string().required(),
  complianceType: Joi.string().valid('Security License', 'Renewal', 'Certificate').optional(),
  licenseRef: Joi.string().optional(),
  expiryDate: Joi.date().optional(),
  reminder: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  attachmentPath: Joi.string().optional(),
});

const updateComplianceSchema = Joi.object({
  complianceName: Joi.string().optional(),
  complianceType: Joi.string().valid('Security License', 'Renewal', 'Certificate').optional(),
  licenseRef: Joi.string().optional(),
  expiryDate: Joi.date().optional(),
  reminder: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  attachmentPath: Joi.string().optional(),
  status: Joi.string().valid('Pending', 'Approved', 'Rejected', 'Cancelled').optional(),
  approved: Joi.boolean().optional(),
}).min(1);

module.exports = { 
  createComplianceSchema, 
  updateComplianceSchema 
};
