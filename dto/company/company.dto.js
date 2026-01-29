const Joi = require('joi');
const CompanySchema = Joi.object({
    companyName:Joi.string().required(),
    companyEmail:Joi.string().required(),
    ContactInfo:Joi.string().required(),
    address:Joi.string().required(),
    registrationNumber:Joi.string().required(),
    plan:Joi.string().required(),
});
module.exports = CompanySchema;
