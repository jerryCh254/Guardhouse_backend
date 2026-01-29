const Joi = require("joi")

const siteSchema = Joi.object({
    siteName:Joi.string(),
    id:Joi.string(),
    customer:Joi.string(),
    siteReferenceNumber:Joi.string(),
    referenceId:Joi.string()
})