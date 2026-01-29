const Joi = require('joi');

const createComplianceItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  reminder: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  showToCustomer: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});

const updateComplianceItemSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  reminder: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  showToCustomer: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

const addRenewalSchema = Joi.object({
  renewedAt: Joi.date().optional(),
  expiryDate: Joi.date().optional(),
  notes: Joi.string().optional(),
});

module.exports = { createComplianceItemSchema, updateComplianceItemSchema, addRenewalSchema };
