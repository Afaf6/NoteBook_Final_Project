const Joi = require("joi");

const SubscripValidSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(100)
    .required(),

    category: Joi.string()
    .required(),

    cost: Joi.number()
    .require(),

    billingCycle: Joi.string()
    .valid("monthly", "yearly")
    .default("monthly"),

    usageFrequency: Joi.number()
    .default("0"),

    startDate: Joi.date()
    .default(date.now),

    lastUsed:Joi.date()
})

module.exports = SubscripValidSchema