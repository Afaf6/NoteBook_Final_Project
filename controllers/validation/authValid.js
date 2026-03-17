const Joi = require("joi");

const authValidSchema = Joi.object({

    userName: Joi.string()
    .min(3)
    .max(20)
    .required(),

    email: Joi.string()
    .email()
    .required(),

    password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$"))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
  .email()
  .required(),

  password: Joi.string()
  .min(6)
  .required(),
});

module.exports = 
{authValidSchema, loginSchema};