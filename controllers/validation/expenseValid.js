const Joi = require("joi");

const ExpenseValidSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(100)
    .required(),

    amount: Joi.number()
    .required(),

    category: Joi.string()
    .valid("all","food", "transport", "healthy", "education", "entertainment", "shopping", "bills", "other")
    .default("all"),

    date: Joi.date()
    .default(Date.now),

})

module.exports = ExpenseValidSchema