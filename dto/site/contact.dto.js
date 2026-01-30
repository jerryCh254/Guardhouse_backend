const Joi = require('joi');

const siteSchema = Joi.object({
    firstName:Joi.string(),
    lastName:Joi.string(),
    emailAddress:Joi.string(),
    mobileNumber:Joi.string(),
    contactType:Joi.string(),
    notes:Joi.string(),

})
module.exports = siteSchema;