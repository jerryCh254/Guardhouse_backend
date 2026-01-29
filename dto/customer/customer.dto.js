const Joi = require("joi")

const companySchema = Joi.object({
    customerName:Joi.string().required(),
    customerReferenceNumber:Joi.string(),
    ReferenceId:Joi.string(),
    Address:Joi.string(),
    city:Joi.string(),
    zipCode:Joi.string(),
    country:Joi.string(),
    invoiceRemainder:Joi.string(),
   Contact: Joi.array().items(
    Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string(),
        mobileNumber: Joi.string(),
        position: Joi.string(),
        note: Joi.string(),
    })
)
})
module.exports = companySchema;
