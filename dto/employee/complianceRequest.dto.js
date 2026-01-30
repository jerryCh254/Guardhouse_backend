const Joi = require('joi');

const createComplianceRequestSchema = Joi.object({
  complianceItemIds: Joi.array().items(Joi.string()).required().min(1),
});

module.exports = { createComplianceRequestSchema };
