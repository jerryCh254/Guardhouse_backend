const Joi = require('joi');

const createRoleTemplateSchema = Joi.object({
  name: Joi.string().required(),
  securityLicenceRequirements: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  showToCustomer: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
});

const updateRoleTemplateSchema = Joi.object({
  name: Joi.string().optional(),
  securityLicenceRequirements: Joi.string().optional(),
  critical: Joi.boolean().optional(),
  showToCustomer: Joi.boolean().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createRoleTemplateSchema, updateRoleTemplateSchema };
