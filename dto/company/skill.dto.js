const Joi = require('joi');

const createSkillSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

const updateSkillSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createSkillSchema, updateSkillSchema };
