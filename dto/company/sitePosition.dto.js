const Joi = require('joi');

const createSitePositionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

const updateSitePositionSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createSitePositionSchema, updateSitePositionSchema };
