const Joi = require("joi");

const incomeVaildSchema = Joi.object({

    amount: Joi.number()
    .min(0)
    .required(),

    month: Joi.string()
    .valid("January","February","March","April","May","June","July","August","September","October","November","December")
    .required(),
});

module.exports = incomeVaildSchema;