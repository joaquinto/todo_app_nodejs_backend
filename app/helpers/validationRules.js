const Joi = require('@hapi/joi')

const validationRules = {
    title: Joi.string().required().trim().min(3),
    isCompleted: Joi.string().trim().min(3).valid("true", "false"),
    description: Joi.string().required().trim().min(3),
    from_date: Joi.date().min('1-1-2020').iso(),
    to_date: Joi.date().min('1-1-2020').iso(),
}


module.exports = validationRules