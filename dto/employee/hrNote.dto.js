const Joi = require('joi');

const createHrNoteSchema = Joi.object({
  note: Joi.string().required(),
});

module.exports = { createHrNoteSchema };
