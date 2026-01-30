const Joi = require('joi');

const createRegionSchema = Joi.object({
  name: Joi.string().required(),
  geoJson: Joi.object().optional(),
});

const updateRegionSchema = Joi.object({
  name: Joi.string().optional(),
  geoJson: Joi.object().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createRegionSchema, updateRegionSchema };
