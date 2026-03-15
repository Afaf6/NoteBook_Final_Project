const Joi = require("joi");
const { min } = require("./authValid");

const goalValidSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required(),
    
    description: Joi.string()
    .max(500),

    targetValue: Joi.number()
    .required(),

    currentValue: Joi.number()
    .min(0)
    .max(Joi.ref('targetValue')),

    unit: Joi.string(),

    priority: Joi.number()
    .min(0)
    .max(5),

    deadline: Joi.date(),
});

module.exports = goalValidSchema