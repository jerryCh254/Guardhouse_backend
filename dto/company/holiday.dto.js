const Joi = require('joi');

const createHolidaySchema = Joi.object({
  description: Joi.string().required(),
  date: Joi.date().required(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).default('00:00'),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).default('23:59'),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  year: Joi.number().integer().optional(),
});

const updateHolidaySchema = Joi.object({
  description: Joi.string().optional(),
  date: Joi.date().optional(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  year: Joi.number().integer().optional(),
}).min(1);

module.exports = { createHolidaySchema, updateHolidaySchema };
