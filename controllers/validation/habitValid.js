const Joi = require ("joi");


const habitValidSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required(),

    frequency: Joi.string()
    .valid("daily", "weekly")
    .default("daily"),

    description: Joi.string()
    .max(500),

    completedDates: Joi.array()
    .items(Joi.date()),
});

module.exports = habitValidSchema;