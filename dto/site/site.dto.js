const Joi = require("joi")

const siteSchema = Joi.object({
    siteName:Joi.string(),
    id:Joi.string(),
    customer:Joi.string(),
    siteReferenceNumber:Joi.string(),
    referenceId:Joi.string(),
    address:Joi.string(),
    state:Joi.string(),
    zipCode:Joi.string(),
    country:Joi.string(),
    mobileNumber:Joi.string(),
    welfarecheckInterval:Joi.string(),
    holidayCalender:Joi.string(),
    mobileClockTime:Joi.string(),
    welfareChecks:Joi.array().items(
        Joi.object({
  day: Joi.string().valid("monday","tuesday","wednesday","thursday","friday","saturday","sunday").required(),
  startHours: Joi.string().required(),
  toHours: Joi.string().required()
})),
})

module.exports = siteSchema;
