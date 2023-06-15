const Joi = require("joi");

const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    passsword: Joi.string().min(6).required(),
});

module.exports = {
    userRegisterSchema,
};