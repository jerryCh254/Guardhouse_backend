const Joi = require('joi');


const customerPortalSchema = Joi.object({
    customerName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    staticSites: Joi.array().items(Joi.string()).required(),
    patrolSites: Joi.array().items(Joi.string()).required(),
    defaultReports: Joi.array().items(Joi.string()).required(),
    specificIncidentReports: Joi.array().items(Joi.string()).required(),
    frequency: Joi.string().optional()
});

module.exports = customerPortalSchema;
