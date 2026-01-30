const Joi = require('joi');

const patrolSiteInRunsheetSchema = Joi.object({
  patrolSiteId: Joi.string().required(),
  days: Joi.array().items(Joi.string().valid('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')).optional(),
  timeFrom: Joi.string().optional(),
  timeTo: Joi.string().optional(),
  visitsCount: Joi.number().optional(),
  expectedTimeMinutes: Joi.number().optional(),
});

const createRunsheetSchema = Joi.object({
  regionId: Joi.string().optional(),
  name: Joi.string().required(),
  defaultRun: Joi.string().optional(),
  runsheetStart: Joi.string().optional(),
  runsheetEnd: Joi.string().optional(),
  days: Joi.array().items(Joi.string().valid('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')).optional(),
  patrolSites: Joi.array().items(patrolSiteInRunsheetSchema).optional(),
  runsheetLength: Joi.string().optional(),
  totalExpectedTime: Joi.string().optional(),
});

const updateRunsheetSchema = Joi.object({
  regionId: Joi.string().optional(),
  name: Joi.string().optional(),
  defaultRun: Joi.string().optional(),
  runsheetStart: Joi.string().optional(),
  runsheetEnd: Joi.string().optional(),
  days: Joi.array().items(Joi.string().valid('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')).optional(),
  patrolSites: Joi.array().items(patrolSiteInRunsheetSchema).optional(),
  runsheetLength: Joi.string().optional(),
  totalExpectedTime: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
}).min(1);

module.exports = { createRunsheetSchema, updateRunsheetSchema };
