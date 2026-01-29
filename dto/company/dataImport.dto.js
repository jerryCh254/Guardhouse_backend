const Joi = require('joi');

const createDataImportSchema = Joi.object({
  importType: Joi.string().required(),
});

module.exports = { createDataImportSchema };
