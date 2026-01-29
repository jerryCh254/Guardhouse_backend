const Joi = require('joi');

const createDocumentSchema = Joi.object({
  name: Joi.string().required(),
  allowAllStaffToView: Joi.boolean().optional(),
  requiresAcknowledgementBeforeShift: Joi.boolean().optional(),
  expireOnOrBefore: Joi.date().optional(),
  expirePeriod: Joi.string().optional(),
});

const updateDocumentSchema = Joi.object({
  name: Joi.string().optional(),
  allowAllStaffToView: Joi.boolean().optional(),
  requiresAcknowledgementBeforeShift: Joi.boolean().optional(),
  expireOnOrBefore: Joi.date().optional(),
  expirePeriod: Joi.string().optional(),
}).min(1);

module.exports = { createDocumentSchema, updateDocumentSchema };
