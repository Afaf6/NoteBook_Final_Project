const Joi = require("joi");

const ExpenseValidSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required(),

    amount: Joi.number()
    .required(),

    category: Joi.string()
    .valid("food", "transport", "health", "education", "entertainment", "shopping", "bills", "other")
    .default("other"),


    date: Joi.date()
    .default(Date.now),

})

module.exports = ExpenseValidSchema