const Joi = require('joi');

const updateManagerSitesSchema = Joi.object({
  siteIds: Joi.array().items(Joi.string()).required(),
});

module.exports = { updateManagerSitesSchema };
